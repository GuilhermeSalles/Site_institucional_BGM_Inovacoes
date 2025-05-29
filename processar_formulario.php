<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validação dos dados
    $nome = filter_input(INPUT_POST, "user_name", FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, "user_email", FILTER_SANITIZE_EMAIL);
    $telefone = filter_input(INPUT_POST, "user_tel", FILTER_SANITIZE_STRING);
    $descricao = filter_input(INPUT_POST, "user_idea", FILTER_SANITIZE_STRING);
    $planType = filter_input(INPUT_POST, "planType", FILTER_SANITIZE_STRING);

    // Verificação básica dos campos obrigatórios
    if (empty($nome) || empty($email) || empty($telefone)) {
        echo '<script>alert("Por favor, preencha todos os campos obrigatórios."); window.history.back();</script>';
        exit;
    }

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.hostinger.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'sac@bgminovacoes.com.br';
        $mail->Password = 'BGm_020425@';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';

        $mail->setFrom('sac@bgminovacoes.com.br', 'Chamados Formulário');
        $mail->addAddress('sac@bgminovacoes.com.br');
        $mail->addReplyTo($email, $nome);

        $mail->isHTML(true);
        $mail->Subject = "Nova solicitação de proposta: Plano " . ($planType ?: 'Plano não especificado');

        $message = "<!DOCTYPE html>
        <html lang='pt-BR'>
        <head>
            <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>
        </head>
        <body>
            <h2>Nova solicitação de contato</h2>
            <p><strong>Plano de interesse:</strong> " . ($planType ?: 'Não especificado') . "</p>
            <p><strong>Nome:</strong> $nome</p>
            <p><strong>E-mail:</strong> $email</p>
            <p><strong>Telefone:</strong> $telefone</p>
            " . (!empty($descricao) ? "<p><strong>Mensagem:</strong><br>" . nl2br($descricao) . "</p>" : "") . "
        </body>
        </html>";

        $mail->Body = $message;
        $mail->AltBody = strip_tags($message);

        if ($mail->send()) {
            echo '<script>alert("Mensagem enviada com sucesso!"); window.location.href = "../";</script>';
        } else {
            throw new Exception('Erro no envio');
        }
    } catch (Exception $e) {
        error_log('Erro no envio de email: ' . $e->getMessage());
        echo '<script>alert("Erro ao enviar mensagem. Por favor, tente novamente mais tarde."); window.history.back();</script>';
    }
} else {
    header("Location: ../");
    exit;
}
