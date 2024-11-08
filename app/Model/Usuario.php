<?php
namespace App\Model;
use App\Database\Database;
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

    public function __construct() {
        $this->conn = Database::getInstance();
    }

    public function insertUsuario($usuario) {
        $nome = $usuario->getNome();
        $email = $usuario->getEmail();
        $senha = $usuario->getSenha();
        $perfil = $usuario->getPerfil();
        $estado = $usuario->getEstado();
        $dataCad = $usuario->getData_cad();
        $query = "INSERT INTO $this->table (nome, email, senha, perfil) VALUES (:nome, :email, :senha, :perfil)";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":senha", $senha);
        $stmt->bindParam(":perfil", $perfil);

        return $stmt->execute();
    }

    public function getUsuarioId(){
        return $this->id_usuario;
    }

    public function setUsuarioId($id_usuario): self{
        $this->id_usuario = $id_usuario;

        return $this;
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
        return $this->data_cad;
    }

    public function getUsuarioByEmail($email) {
        $query = "SELECT * FROM $this->table WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":email", $email);
        $stmt->execute();
    
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getAllUsuarios() {
        $query = "SELECT * FROM $this->table";
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

    public function updateUsuario() {
        $id_usuario = $this->getUsuarioId();
        $nome = $this->getNome();
        $email = $this->getEmail();
        $senha = $this->getSenha();
        $perfil = $this->getPerfil();
        $estado = $this->getEstado();
        $query = "UPDATE $this->table SET nome = :nome, email = :email, senha = :senha, perfil = :perfil, estado = :estado WHERE id_usuario = :id_usuario";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":senha", $senha);
        $stmt->bindParam(":perfil", $perfil);
        $stmt->bindParam(":estado", $estado);
        $stmt->bindParam(":id_usuario", $id_usuario);
    
        return $stmt->execute();
    }
    
    public function deleteUsuario($id_usuario) {
        $query = "DELETE FROM usuarios WHERE id_usuario = :id_usuario";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_usuario", $id_usuario, PDO::PARAM_INT);
        return $stmt->execute();
    }
}
