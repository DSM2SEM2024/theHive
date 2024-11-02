<?php
namespace App\Model;
use App\Database\Database;
use PDO;

class Usuario {
    private $idUsuario;
    private $nome;
    private $email;
    private $senha;
    private $curso;
    private $tipo;
    private $conn;
    private $table = "Usuarios";

    public function __construct() {
        $this->conn = Database::getInstance();
    }
    public function insertUsuario($usuario) {
        $nome = $usuario->getNome();
        $email = $usuario->getEmail();
        $senha = $usuario->getSenha();
        $curso = $usuario->getCurso();
        $tipo = $usuario->getTipo();
        $query = "INSERT INTO $this->table (nome, email, senha, curso, tipo) VALUES (:nome, :email, :senha, :curso, :tipo)";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":senha", $senha);
        $stmt->bindParam(":curso", $curso);
        $stmt->bindParam(":tipo", $tipo);

        return $stmt->execute();
    }
    public function getUsuarioId(){
        return $this->idUsuario;
    }

    public function setUsuarioId($idUsuario): self{
        $this->idUsuario = $idUsuario;

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

    public function getCurso() {
        return $this->curso;
    }

    public function setCurso($curso): self {
        $this->curso = $curso;
        return $this;
    }

    public function getTipo() {
        return $this->tipo;
    }
    
    public function setTipo($tipo): self {
        $this->tipo = $tipo;
        return $this;
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

    public function getUsuarioById($idUsuario) {
        $query = "SELECT * FROM $this->table WHERE idUsuario = :idUsuario";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":idUsuario", $idUsuario, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updateUsuario() {
        $idUsuario = $this->getUsuarioId();
        $nome = $this->getNome();
        $email = $this->getEmail();
        $senha = $this->getSenha();
        $tipo = $this->getTipo();
        $query = "UPDATE $this->table SET nome = :nome, email = :email, senha = :senha, curso = :curso, tipo = :tipo WHERE idUsuario = :idUsuario";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":senha", $senha);
        $stmt->bindParam(":tipo", $tipo);
        $stmt->bindParam(":idUsuario", $idUsuario);
    
        return $stmt->execute();
    }
    
    public function deleteUsuario($idUsuario) {
        $query = "DELETE FROM usuarios WHERE idUsuario = :idUsuario";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":idUsuario", $idUsuario, PDO::PARAM_INT);
        return $stmt->execute();
    }
}
