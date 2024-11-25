<?php
namespace App\Model;
use App\Database\Database;
use App\Model\Log;
use App\utils\AuthHelpers;
use PDO;

class Usuario {
    private $id_usuario;
    private $nome;
    private $email;
    private $senha;
    private $perfil;
    private $estado;
    private $dataCad;
    private $conn;
    private $table = "Usuarios";
    private $helper;
    private $log;

    public function __construct() {
        $this->conn = Database::getInstance();
        $this->helper = new AuthHelpers();
        $this->log = new Log();
    }

    public function insertUsuario($usuario) {
        $nome = $usuario->getNome();
        $email = $usuario->getEmail();
        $senha = $usuario->getSenha();
        $perfil = $usuario->getPerfil();
        $estado = $usuario->getEstado();
        $dataCad = $usuario->getDataCad();
        $query = "INSERT INTO $this->table (nome, email, senha, perfil) VALUES (:nome, :email, :senha, :perfil)";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":senha", $senha);
        $stmt->bindParam(":perfil", $perfil);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "INSERT", "Usuários"); 
        }

        return $executar;
    }

    public function getUsuarioId(){
        return $this->id_usuario;
    }

    public function getNome(){
        return $this->nome;
    }

    public function setNome($nome): self{
        $this->nome = $nome;

        return $this;
    }

    public function getEmail(){
        return $this->email;
    }

    public function setEmail($email): self{
        $this->email = $email;
        return $this;
    }

    public function getSenha() {
        return $this->senha;
    }

    public function setSenha($senha): self {
        $this->senha = password_hash($senha, PASSWORD_DEFAULT);
        return $this;
    }

    public function getPerfil() {
        return $this->perfil;
    }
    
    public function setPerfil($perfil): self {
        $this->perfil = $perfil;
        return $this;
    }

    public function getEstado() {
        return $this->estado;
    }

    public function setEstado($estado): self {
        $this->estado = $estado;
        return $this;
    }

    public function getDataCad() {
        return $this->dataCad;
    }

    public function getUsuarioByEmail($email) {
        $query = "SELECT * FROM $this->table WHERE email = :email AND estado = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email", $email);
        $stmt->execute();
    
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getAllUsuarios() {
        $query = "SELECT * FROM $this->table WHERE estado = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUsuarioById($id_usuario) {
        $query = "SELECT * FROM $this->table WHERE id_usuario = :id_usuario";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_usuario", $id_usuario, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getUsuarioByName($nomeUsuario) {
        $query = "SELECT id_usuario, nome, email, perfil, estado, data_cad FROM $this->table WHERE LOWER(nome) LIKE :nome AND estado = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $nomeUsuario);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function updateUsuario($id_usuario) {
        $nome = $this->getNome();
        $email = $this->getEmail();
        $senha = $this->getSenha();
        $perfil = $this->getPerfil();
        $query = "UPDATE $this->table SET nome = :nome, email = :email, senha = :senha, perfil = :perfil WHERE id_usuario = :id_usuario";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":senha", $senha);
        $stmt->bindParam(":perfil", $perfil);
        $stmt->bindParam(":id_usuario", $id_usuario);
    
        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "UPDATE", "Usuários"); 
        }

        return $executar;
    }

    public function desativar($id)
    {
        $query = "UPDATE $this->table SET estado = 0 WHERE id_usuario = :id_usuario";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_usuario', $id, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "DEACTIVATED", "Usuario");
        }
        return $executar;
    }

    public function ativar($id)
    {
        $query = "UPDATE $this->table SET estado = 1 WHERE id_usuario = :id_usuario";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_usuario', $id, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "ACTIVATED", "Usuario");
        }
        return $executar;
    }

    public function deleteUsuario($id_usuario) {
        $query = "DELETE FROM usuarios WHERE id_usuario = :id_usuario";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_usuario", $id_usuario, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "DELETE", "Usuários"); 
        }

        return $executar;
    }

    // public function updateSenha($id_usuario, $novaSenha) {
    //     $query = "UPDATE $this->table SET senha = :novaSenha WHERE id_usuario = :id_usuario";
    //     $stmt = $this->conn->prepare($query);
    //     $stmt->bindParam(':id_usuario', $id_usuario, PDO::PARAM_INT);
    //     $stmt->bindParam(':novaSenha', $novaSenha, PDO::PARAM_INT);
    //     $executar = $stmt->execute();
    //     if ($executar) {
    //         $tokenUser = $this->helper->verificarTokenComPermissao();
    //         $this->log->registrar($tokenUser['id_usuario'], "ACTIVATED", "Usuario");
    //     }
    //     return $executar;
    // }
}