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

    public function atualizarEstadoCurso($idCurso, $novoEstado) {
        $query = "UPDATE CURSO SET estado = :estado WHERE id_curso = :id_curso";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":estado", $novoEstado, PDO::PARAM_INT);
        $stmt->bindParam(":id_curso", $idCurso, PDO::PARAM_INT);
        return $stmt->execute();
    }

}