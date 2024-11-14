<?php
namespace App\Model;
use App\Database\Database;
use PDO;

class Log {
    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance();
    }

    public function registrar($usuario_id, $acao) {
        $query = "INSERT INTO log (usuario_id, acao, data_hora) VALUES (:usuario_id, :acao, NOW())";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":usuario_id", $usuario_id);
        $stmt->bindParam(":acao", $acao);
        return $stmt->execute();
    }

    public function getAllLogs() {
        $query = "SELECT * FROM log";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

