<?php
namespace App\Model;
use App\Database\Database;
use PDO;

class Curso {
    private $idCurso;
    private $nome;
    private $estado;
    private $dataCad;
    private $conn;
    private $table = "curso";

    public function __construct() {
        $this->conn = Database::getInstance();
    }

    public function create(){
        $query = "INSERT INTO $this->table (nome) VALUES (:nome)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $this->nome, PDO::PARAM_STR);
        return $stmt->execute();
    }
        
    public function getById($idCurso) {
        $query = "SELECT * FROM $this->table WHERE id_curso = :id_curso";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_curso", $idCurso, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getAll() {
        $query = "SELECT * FROM $this->table";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    //AQUI Lucas
    public function atualizarEstadoCurso($idCurso, $novoEstado) {
        $query = "UPDATE $this->table SET estado = :estado WHERE id_curso = :id_curso";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":estado", $novoEstado, PDO::PARAM_INT);
        $stmt->bindParam(":id_curso", $idCurso, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function update($idCurso) {
        $query = "UPDATE $this->table SET nome = :nome, estado = :estado, data_cad = :data_cad WHERE id_curso = :id_curso";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_curso", $idCurso, PDO::PARAM_INT);
        $stmt->bindParam(":nome", $this->nome, PDO::PARAM_STR);
        $stmt->bindParam(":estado", $this->estado, PDO::PARAM_INT);
        $stmt->bindParam(":data_cad", $this->dataCad, PDO::PARAM_STR);
        return $stmt->execute();
    }

    public function delete($idCurso) {
        $query = "DELETE FROM $this->table WHERE id_curso = :id_curso";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_curso", $idCurso, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function getCursoId() {
        return $this->idCurso;
    }
    public function setCursoId($idCurso): self {
        $this->idCurso = $idCurso;
        return $this;
    }

    public function getNome() {
        return $this->nome;
    }
    public function setNome($nome): self {
        $this->nome = $nome;
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

    public function setDataCad($dataCad): self {
        $this->dataCad = $dataCad;
        return $this;
    }
}




    