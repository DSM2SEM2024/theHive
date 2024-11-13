<?php

namespace App\utils;

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

session_start();

function verificarTokenComPermissao($perfilNecessario) {
    $jwtSecret = 'chave123';

    // Obter o cabeçalho de autorização
    $authHeader = getAuthorizationHeader();
    if (!$authHeader) {
        http_response_code(401);
        echo json_encode(["error" => "Token de autorização não fornecido."]);
        exit();
    }

    // Extrair o token
    $token = str_replace('Bearer ', '', $authHeader);

    // Verificar o token e obter os dados do usuário
    try {
        $usuario = (array) JWT::decode($token, new Key($jwtSecret, 'HS256'));
    } catch (\Exception $e) {
        http_response_code(401);
        echo json_encode(["error" => "Token inválido ou expirado."]);
        exit();
    }

    // Verificar a permissão
    if ($usuario['perfil'] !== $perfilNecessario && $usuario['perfil'] !== 'AdminMaster') {
        http_response_code(403);
        echo json_encode(["error" => "Você não tem permissão para essa ação."]);
        exit();
    }

    // Retornar os dados do usuário se tudo estiver correto
    return $usuario;
}

function getAuthorizationHeader() {
    $headers = null;
    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER["Authorization"]);
    } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) { // Para servidores Apache
        $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        }
    }
    return $headers;
}
