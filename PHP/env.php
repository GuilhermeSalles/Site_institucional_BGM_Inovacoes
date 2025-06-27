<?php
// Define o caminho absoluto para o arquivo .env
$envFile = __DIR__ . '/.env';

// Verifica se o arquivo .env existe
if (!file_exists($envFile)) {
    header('HTTP/1.1 500 Internal Server Error');
    exit('Arquivo de configuração .env não encontrado');
}

// Lê o arquivo .env linha por linha
$lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($lines as $line) {
    // Ignora comentários
    if (strpos(trim($line), '#') === 0) {
        continue;
    }
    
    // Separa nome e valor
    list($name, $value) = explode('=', $line, 2);
    $name = trim($name);
    $value = trim($value);
    
    // Remove aspas se existirem
    if (preg_match('/^"(.*)"$/', $value, $matches)) {
        $value = $matches[1];
    } elseif (preg_match('/^\'(.*)\'$/', $value, $matches)) {
        $value = $matches[1];
    }
    
    // Define a variável de ambiente
    putenv("$name=$value");
    $_ENV[$name] = $value;
    $_SERVER[$name] = $value;
}

// Função auxiliar para obter variáveis de ambiente
function env($key, $default = null) {
    $value = getenv($key);
    
    if ($value === false) {
        return $default;
    }
    
    // Converte valores booleanos
    switch (strtolower($value)) {
        case 'true':
            return true;
        case 'false':
            return false;
        case 'null':
            return null;
    }
    
    return $value;
}

// Protege o arquivo contra acesso direto
if (basename(__FILE__) == basename($_SERVER['SCRIPT_NAME'])) {
    header('HTTP/1.1 403 Forbidden');
    exit('Acesso direto não permitido');
}