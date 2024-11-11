<?php
namespace App\Views;

require_once '../utils/AuthHelpers.php';

\App\utils\verificarPermissao('AdminMaster');  // Aqui usamos o namespace completo

echo "Bem-vindo, administrador mestre! Aqui está o conteúdo exclusivo para administradores mestres.";