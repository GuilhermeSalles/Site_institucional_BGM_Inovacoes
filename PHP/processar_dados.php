<?php
// Adicione isto no início do arquivo
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Ou seu domínio específico
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Altere o require_once para o caminho correto
require_once __DIR__ . '/config.php';
require __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$response = ['success' => false, 'message' => ''];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    try {
        // Recebe os dados brutos do POST
        $data = json_decode(file_get_contents('php://input'), true) ?? $_POST;
        
        // Validação dos dados
        $nome = filter_var($data['name'] ?? '', FILTER_SANITIZE_STRING);
        $email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);
        $tipoSolicitacao = filter_var($data['request_type'] ?? '', FILTER_SANITIZE_STRING);
        $detalhes = filter_var($data['details'] ?? '', FILTER_SANITIZE_STRING);

        if (empty($nome) || !$email || empty($tipoSolicitacao)) {
            throw new Exception("Por favor, preencha todos os campos obrigatórios.");
        }

        $mail = new PHPMailer(true);
        
        // Configuração do SMTP (usando constantes do config.php)
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USER;
        $mail->Password = SMTP_PASS;
        $mail->SMTPSecure = SMTP_SECURE;
        $mail->Port = SMTP_PORT;
        $mail->CharSet = 'UTF-8';

        $mail->setFrom(SMTP_USER, 'Solicitação LGPD - BGM');
        $mail->addAddress(CONTACT_EMAIL);
        $mail->addReplyTo($email, $nome);

        $mail->isHTML(true);
        $mail->Subject = "Solicitação LGPD: " . $tipoSolicitacao;

          $tipos = [
            'access' => 'Acesso aos dados',
            'correction' => 'Correção de dados',
            'deletion' => 'Exclusão de dados',
            'portability' => 'Portabilidade de dados',
            'revoke' => 'Revogação de consentimento',
            'other' => 'Outro'
        ];

        $message = "<!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; }
                .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .detail { margin-bottom: 10px; }
                .detail strong { display: inline-block; width: 150px; }
            </style>
        </head>
        <body>
            <div class='header'>
                <h2>Nova solicitação LGPD</h2>
            </div>
            <div class='content'>
                <div class='detail'><strong>Tipo de solicitação:</strong> " . htmlspecialchars($tipos[$tipoSolicitacao] ?? $tipoSolicitacao) . "</div>
                <div class='detail'><strong>Nome:</strong> " . htmlspecialchars($nome) . "</div>
                <div class='detail'><strong>E-mail:</strong> " . htmlspecialchars($email) . "</div>
                " . (!empty($detalhes) ? "<div class='detail'><strong>Detalhes:</strong><br>" . nl2br(htmlspecialchars($detalhes)) . "</div>" : "") . "
                <div class='detail'><strong>Data:</strong> " . date('d/m/Y H:i:s') . "</div>
                <div class='detail'><strong>IP:</strong> " . $_SERVER['REMOTE_ADDR'] . "</div>
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