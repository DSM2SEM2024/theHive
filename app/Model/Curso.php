<?php
namespace App\Model;
use App\Database\Database;
use App\Model\Log;
use App\utils\AuthHelpers;
use PDO;

class Curso {
    private $idCurso;
    private $nome;
    private $estado;
    private $dataCad;
    private $conn;
    private $table = "curso";
    private $log;
    private $helper;

    public function __construct() {
        $this->conn = Database::getInstance();
        $this->log = new Log();
        $this->helper = new AuthHelpers();
    }

    public function create(){
        $query = "INSERT INTO $this->table (nome) VALUES (:nome)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $this->nome, PDO::PARAM_STR);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "INSERT", "Curso"); 
        }
        return $executar;
    }
        
    public function getById($idCurso) {
        $query = "SELECT * FROM $this->table WHERE id_curso = :id_curso";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_curso", $idCurso, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getAll() {
        $query = "SELECT * FROM $this->table WHERE estado = 1";
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

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "UPDATE", "Curso"); 
        }
        return $executar;
    }

    public function update($idCurso) {
        $query = "UPDATE $this->table SET nome = :nome WHERE id_curso = :id_curso";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_curso", $idCurso, PDO::PARAM_INT);
        $stmt->bindParam(":nome", $this->nome, PDO::PARAM_STR);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "UPDATE", "Curso"); 
        }
        return $executar;
    }

    public function desativar($id)
    {
        $query = "UPDATE $this->table SET estado = 0 WHERE id_curso = :id_curso";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_curso', $id, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "DEACTIVATED", "Curso");
        }
        return $executar;
    }

    public function ativar($id)
    {
        $query = "UPDATE $this->table SET estado = 1 WHERE id_curso = :id_curso";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_curso', $id, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "ACTIVATED", "Curso");
        }
        return $executar;
    }

    public function delete($idCurso) {
        $query = "DELETE FROM $this->table WHERE id_curso = :id_curso";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_curso", $idCurso, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "DELETE", "Curso"); 
        }
        return $executar;
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




    