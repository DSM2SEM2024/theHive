<?php
namespace App\Model;
use App\Database\Database;
use PDO;

class Disciplina {
    private $idDisciplina;
    private $idCurso;
    private $nome;
    private $estado;
    private $dataCad;
    private $conn;
    private $table = "disciplina";

    public function __construct() {
        $this->conn = Database::getInstance();
    }

    public function getDisciplinaId() {
        return $this->idDisciplina;
    }

    public function getCursoId() {
        return $this->idCurso;
    }
    public function setCursoId($idCurso): self {
        $this->idCurso = $idCurso;
    }

    public function getNome() {
        return $this->nome;
    }
    public function setNome($nome): self {
        $this->nome = $nome;
    }

    public function getEstado() {
        return $this->estado;
    }

    public function setEstado($estado): self {
        $this->estado = $estado;
        return $this;
    }