<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recupera e sanitiza os dados do formulário
    $nome = htmlspecialchars($_POST["user_name"], ENT_QUOTES, 'UTF-8');
    $email = filter_var($_POST["user_email"], FILTER_SANITIZE_EMAIL);
    $telefone = htmlspecialchars($_POST["user_tel"], ENT_QUOTES, 'UTF-8');
    $planType = htmlspecialchars($_POST["planType"], ENT_QUOTES, 'UTF-8');

    // Configurações de SMTP
    $mail = new PHPMailer(true);
    try {
        // Configuração do servidor SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.hostinger.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'sac@bgminovacoes.com.br';
        $mail->Password = 'BGm_020425@';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;
        
        // Configurações de charset e encoding
        $mail->CharSet = 'UTF-8'; // Define o charset como UTF-8
        $mail->Encoding = 'base64'; // Melhora a compatibilidade com caracteres especiais

        // Remetente e destinatário
        $mail->setFrom('sac@bgminovacoes.com.br', 'Chamados Formulário', 'UTF-8');
        $mail->addAddress('sac@bgminovacoes.com.br');

        // Conteúdo do e-mail
        $mail->isHTML(true);
        $mail->Subject = "Formulário de: $planType";
        
        // Mensagem com UTF-8
        $message = "<!DOCTYPE html>
        <html lang='pt-BR'>
        <head>
            <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'>
        </head>
        <body>
            <p><strong>Nome Completo:</strong> $nome</p>
            <p><strong>Melhor E-mail:</strong> $email</p>
            <p><strong>Telefone para Contato:</strong> $telefone</p>
            <p><strong>Plano Selecionado:</strong> $planType</p>
        </body>
        </html>";
        
        $mail->Body = $message;
        $mail->AltBody = strip_tags($message); // Versão texto puro para clientes que não suportam HTML

        // Envia o e-mail
        $mail->send();
        echo '<script>alert("Mensagem enviada com sucesso!"); window.location.href = "../";</script>';
    } catch (Exception $e) {
        echo '<script>alert("Erro ao enviar mensagem. Por favor, tente novamente mais tarde."); window.location.href = "../";</script>';
        // Para depuração, você pode descomentar a linha abaixo:
        // echo 'Erro no envio do email: ' . htmlspecialchars($mail->ErrorInfo);
    }
}