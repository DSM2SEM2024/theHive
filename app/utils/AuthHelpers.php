<?php

namespace App\utils;

session_start();

function verificarLogin() {
    if (!isset($_SESSION['perfil'])) {
        http_response_code(401);
        echo json_encode(["error" => "Algo deu errado."]);
        exit();
    }
}

function verificarPermissao($perfilNecessario) {
    verificarLogin();

    if ($_SESSION['perfil'] !== $perfilNecessario) {
        echo "Você não tem permissão para acessar esta página.";
        exit();
    }
}