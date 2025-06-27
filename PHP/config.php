<?php
// Carrega as variáveis de ambiente
require_once __DIR__ . '/env.php';

// Configurações da aplicação
define('APP_ENV', env('APP_ENV', 'production'));
define('APP_DEBUG', env('APP_DEBUG', false));

// Configurações de Email
define('SMTP_HOST', env('SMTP_HOST'));
define('SMTP_PORT', env('SMTP_PORT'));
define('SMTP_SECURE', env('SMTP_SECURE'));
define('SMTP_USER', env('SMTP_USER'));
define('SMTP_PASS', env('SMTP_PASS'));
define('CONTACT_EMAIL', env('CONTACT_EMAIL'));

// Configurações do Site
define('SITE_URL', env('SITE_URL'));
define('SITE_NAME', env('SITE_NAME'));

// Configurações de Banco de Dados (opcional)
define('DB_HOST', env('DB_HOST'));
define('DB_NAME', env('DB_NAME'));
define('DB_USER', env('DB_USER'));
define('DB_PASS', env('DB_PASS'));

// Configurações de segurança
ini_set('display_errors', APP_DEBUG ? '1' : '0');
error_reporting(APP_DEBUG ? E_ALL : 0);
date_default_timezone_set('America/Sao_Paulo');

// Diretório de logs
define('LOG_DIR', __DIR__ . '/logs/');
if (!is_dir(LOG_DIR)) {
    mkdir(LOG_DIR, 0700, true);
}

// Função segura para logging
function secureLog($message, $file = 'app.log') {
    $logFile = LOG_DIR . $file;
    $timestamp = date('[Y-m-d H:i:s]');
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $logMessage = "$timestamp [$ip] $message\n";
    file_put_contents($logFile, $logMessage, FILE_APPEND | LOCK_EX);
}