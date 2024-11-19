<?php

// Importa o arquivo de conexão com o banco de dados

namespace App\Model;
use PDO;
use App\Database\Database;
use App\Model\Log;
use App\utils\AuthHelpers;

class Software {
    private $idSoftware;
    private $nome;
    private $estado;
    private $dataCad;
    private $table = "software";
    private $conn;
    private $log;
    private $helper;

    public function __construct() {
        $this->conn = Database::getInstance();
        $this->log = new Log();
        $this->helper = new AuthHelpers();
    }
    
    public function getAllSoftwares() {
        $query = "SELECT * FROM $this->table WHERE estado = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getSoftwareById($idSoftware) {
        $query = "SELECT * FROM $this->table WHERE id_software = :id_software";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_software", $idSoftware, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function insertSoftware($software) {
        $nome = $software->getNome();
        $query = "INSERT INTO $this->table (nome) VALUES (:nome)";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $nome);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "INSERT", "Software"); 
        }
        return $executar;
    }

    public function updateSoftware($idSoftware) {
        $nome = $this->getNome();
        $query = "UPDATE $this->table SET nome = :nome WHERE id_software = :id_software";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":id_software", $idSoftware);
    
        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "UPDATE", "Software"); 
        }
        return $executar;
    }

    public function desativar($id)
    {
        $query = "UPDATE $this->table SET estado = 0 WHERE id_software = :id_software";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_software', $id, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "DEACTIVATED", "Software");
        }
        return $executar;
    }

    public function ativar($id)
    {
        $query = "UPDATE $this->table SET estado = 1 WHERE id_software = :id_software";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_software', $id, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "ACTIVATED", "Software");
        }
        return $executar;
    }

    public function deleteSoftware($idSoftware) {
        $query = "DELETE FROM $this->table WHERE id_software = :id_software";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_software", $idSoftware, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "DELETE", "Software"); 
        }
        return $executar;
    }

    public function getSoftwareId(){
        return $this->idSoftware;
    }

    public function getNome(){
        return $this->nome;
    }

    public function setNome($nome): self{
        $this->nome = $nome;

        return $this;
    }
}
?>
