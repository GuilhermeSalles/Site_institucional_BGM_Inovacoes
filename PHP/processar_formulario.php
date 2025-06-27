<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Caminho correto para o config.php
require_once __DIR__ . '/config.php';
require __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$response = ['success' => false, 'message' => ''];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        $data = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        
        $nome = filter_var($data['user_name'] ?? '', FILTER_SANITIZE_STRING);
        $email = filter_var($data['user_email'] ?? '', FILTER_VALIDATE_EMAIL);
        $telefone = filter_var($data['user_tel'] ?? '', FILTER_SANITIZE_STRING);
        $descricao = filter_var($data['user_idea'] ?? '', FILTER_SANITIZE_STRING);
        $planType = filter_var($data['planType'] ?? '', FILTER_SANITIZE_STRING);
        $consentimento = !empty($data['privacy_consent']);

        if (empty($nome) || !$email || empty($telefone) || !$consentimento) {
            throw new Exception("Por favor, preencha todos os campos obrigatórios.");
        }

        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USER;
        $mail->Password = SMTP_PASS;
        $mail->SMTPSecure = SMTP_SECURE;
        $mail->Port = SMTP_PORT;
        $mail->CharSet = 'UTF-8';

        $mail->setFrom(SMTP_USER, 'Formulário de Contato');
        $mail->addAddress(CONTACT_EMAIL);
        $mail->addReplyTo($email, $nome);
        $mail->isHTML(true);
        $mail->Subject = "Nova solicitação: " . ($planType ?: 'Contato geral');

        
        $message = "<!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                .header { background-color: #f8f9fa; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .detail { margin-bottom: 10px; }
                .detail strong { display: inline-block; width: 120px; }
            </style>
        </head>
        <body>
            <div class='header'>
                <h2>Nova solicitação de contato</h2>
            </div>
            <div class='content'>
                <div class='detail'><strong>Plano:</strong> " . htmlspecialchars($planType ?: 'Não especificado') . "</div>
                <div class='detail'><strong>Nome:</strong> " . htmlspecialchars($nome) . "</div>
                <div class='detail'><strong>E-mail:</strong> " . htmlspecialchars($email) . "</div>
                <div class='detail'><strong>Telefone:</strong> " . htmlspecialchars($telefone) . "</div>
                " . (!empty($descricao) ? "<div class='detail'><strong>Mensagem:</strong><br>" . nl2br(htmlspecialchars($descricao)) . "</div>" : "") . "
                <div class='detail'><strong>Data:</strong> " . date('d/m/Y H:i:s') . "</div>
            </div>
        </body>
        </html>";

        $mail->Body = $message;
        $mail->AltBody = strip_tags($message);
        
        if ($mail->send()) {
            $response['success'] = true;
            $response['message'] = 'Solicitação enviada com sucesso!';
        } else {
            throw new Exception('Erro no envio do email.');
        }
    } catch (Exception $e) {
        $response['message'] = $e->getMessage();
        http_response_code(500);
    }
} else {
    $response['message'] = 'Método não permitido';
    http_response_code(405);
}

echo json_encode($response);