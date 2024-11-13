<?php
namespace App\Views;

require_once '../utils/AuthHelpers.php';

$headers = apache_request_headers();
if (!isset($headers['Authorization'])) {
    http_response_code(401);
    echo json_encode(["error" => "Token não fornecido."]);
    exit();
}

$usuario = \App\utils\verificarTokenComPermissao('Professor');

echo "Bem-vindo, professor " . $usuario['nome'] . "! Seu perfil tem acesso ao conteúdo exclusivo para professores.";
