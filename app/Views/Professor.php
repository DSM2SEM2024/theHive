<?php
namespace App\Views;

require_once '../utils/AuthHelpers.php';

\App\utils\verificarPermissao('Professor');  // Aqui usamos o namespace completo

echo "Bem-vindo, professor! Aqui está o conteúdo exclusivo para professores.";