<?php
namespace App\Model;
use App\Database\Database;
use App\Model\Log;
use App\utils\AuthHelpers;
use PDO;

class Andar {
    private $idAndar;
    private $nome;
    private $cor;
    private $estado;
    private $dataCad;
    private $conn;
    private $table = "andar";
    private $log;
    private $helper;

    public function __construct() {
        $this->conn = Database::getInstance();
        $this->log = new Log();
        $this->helper = new AuthHelpers();
    }

    public function criarAndar(Andar $andar) {
        $query = "INSERT INTO $this->table (nome, cor)
                  VALUES (:nome, :cor)";
        $stmt = $this->conn->prepare($query);
    
        $idAndar = $andar->getAndarId();
        $nome = $andar->getNome();
        $cor = $andar->getCor();
        $estado = $andar->getEstado();
        $dataCad = $andar->getDataCad();
    
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":cor", $cor);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "CREATE", "Andar"); 
        }
        return $executar;
    }

    public function getAllAndar() {
        $query = "SELECT * FROM $this->table WHERE estado = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getByIdAndar($idAndar) {
        $query = "SELECT * FROM $this->table WHERE id_andar = :id_andar";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_andar", $idAndar, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    public function updateAndar($idAndar) {
        $query = "UPDATE $this->table SET nome = :nome, cor = :cor WHERE id_andar = :id_andar";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id_andar", $idAndar, PDO::PARAM_INT);
        $stmt->bindParam(":nome", $this->nome);
        $stmt->bindParam(":cor", $this->cor);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "UPDATE", "Andar"); 
        }
        return $executar;
    }
    
    public function desativar($id)
    {
        $query = "UPDATE $this->table SET estado = 0 WHERE id_andar = :id_andar";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_andar', $id, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "DEACTIVATED", "Andar");
        }
        return $executar;
    }

    public function ativar($id)
    {
        $query = "UPDATE $this->table SET estado = 1 WHERE id_andar = :id_andar";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_andar', $id, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "ACTIVATED", "Andar");
        }
        return $executar;
    }

    public function deleteAndar($idAndar) {
        $query = "DELETE FROM $this->table WHERE id_andar = :id_andar";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_andar", $idAndar, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "DELETE", "Andar"); 
        }
        return $executar;
    }

    public function findByEstado($estado) {
        $query = "SELECT * FROM $this->table WHERE estado = :estado";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":estado", $estado, PDO::PARAM_STR);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getAndarId() {
        return $this->idAndar;
    }

    public function getNome() {
        return $this->nome;
    }
    public function setNome($nome): self {
        $this->nome = $nome;
        return $this;
    }

    public function getCor() {
        return $this->cor;
    }
    public function setCor($cor): self {
        $this->cor = $cor;
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
}