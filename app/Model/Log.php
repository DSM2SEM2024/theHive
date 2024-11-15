<?php
namespace App\Model;
use App\Database\Database;
use PDO;

class Log {
    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance();
    }

    public function registrar($idusuario, $acao, $tabela) {
        $query = "INSERT INTO log (id_usuario, acao, tabela, data_hora) VALUES (:id_usuario, :acao, :tabela, NOW())";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_usuario", $idusuario);
        $stmt->bindParam(":acao", $acao);
        $stmt->bindParam(":tabela", $tabela);
        return $stmt->execute();
    }

    public function read() {
        $query = "SELECT * FROM log";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result ?: ["message" => "Nenhum log encontrado."]);
    }

    public function obterLogPorProf($prof) {
        $query = "SELECT * FROM log WHERE id_usuario = :id_usuario";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_usuario", $prof, PDO::PARAM_INT);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($result ?: ["message" => "Nenhum log encontrado."]);
    }
} 

