<?php
namespace App\Views;

require_once '../utils/AuthHelpers.php';

\App\utils\verificarPermissao('Admin');  // Aqui usamos o namespace completo

echo "Bem-vindo, administrador! Aqui está o conteúdo exclusivo para administradores.";