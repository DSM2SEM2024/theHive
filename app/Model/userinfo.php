<?php
include 'Usuario.php'; // Inclua sua classe Usuario

$usuarioModel = new Usuario();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // Busca o usuário pelo e-mail
    $usuario = $usuarioModel->getUsuarioByEmail($email);
    
    if ($usuario && password_verify($senha, $usuario['senha'])) {
        // Login bem-sucedido
        $_SESSION['usuario_id'] = $usuario['idUsuario'];
        $_SESSION['usuario_email'] = $usuario['email']; // Armazenando o e-mail, se precisar
        $_SESSION['usuario_nome'] = $usuario['nome']; // Armazenando o nome, se precisar
        exit();
    }
}