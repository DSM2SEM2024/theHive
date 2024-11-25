<?php
namespace App\Model;
use App\Database\Database;
use App\Model\Log;
use App\utils\AuthHelpers;
use PDO;

class Laboratorio {
    private $idLaboratorio;
    private $nome;
    private $andar;
    private $equipamento;
    private $capacidade;
    private $conn;
    private $table = "Laboratorio";
    private $log;
    private $helper;

    public function __construct() {
        $this->conn = Database::getInstance();
        $this->log = new Log();
        $this->helper = new AuthHelpers(); 
    }

    public function insertLaboratorio($laboratorio) {
        $nome = $laboratorio->getNome();
        $andar = $laboratorio->getAndar();
        $equipamento = $laboratorio->getEquipamento();
        $capacidade = $laboratorio->getCapacidade();
        $query = "INSERT INTO $this->table (nome, andar, equipamento, capacidade) VALUES (:nome, :andar, :equipamento, :capacidade)";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":andar", $andar);
        $stmt->bindParam(":equipamento", $equipamento);
        $stmt->bindParam(":capacidade", $capacidade);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "INSERT", "Laboratório"); 
        }
        return $executar;
    }

    public function getLaboratorioId(){
        return $this->idLaboratorio;
    }

    public function getNome(){
        return $this->nome;
    }

    public function setNome($nome): self{
        $this->nome = $nome;

        return $this;
    }

    public function getAndar(){
        return $this->andar;
    }

    public function setAndar($andar): self{
        $this->andar = $andar;
        return $this;
    }

    public function getEquipamento() {
        return $this->equipamento;
    }

    public function setEquipamento($equipamento): self {
        $this->equipamento = $equipamento;
        return $this;
    }

    public function getCapacidade() {
        return $this->capacidade;
    }
    
    public function setCapacidade($capacidade): self {
        $this->capacidade = $capacidade;
        return $this;
    }

    public function getLaboratorioByName($nome) {
        $query = "SELECT * FROM $this->table WHERE nome = :nome AND estado = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $nome);
        $stmt->execute();
    
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    //método para buscar laboratórios por andar
    public function getLaboratorioByAndar($andar) {
        $query = "SELECT * FROM $this->table WHERE andar = :andar AND estado = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":andar", $andar, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function getAllLaboratorios() {
        $query = "SELECT * FROM $this->table WHERE estado = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getLaboratorioById($idLaboratorio) {
        $query = "SELECT * FROM $this->table WHERE id_laboratorio = :id_laboratorio";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_laboratorio", $idLaboratorio, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updateLaboratorio($idLaboratorio) {
        $nome = $this->getNome();
        $equipamento = $this->getEquipamento();
        $capacidade = $this->getCapacidade();
        $query = "UPDATE $this->table SET nome = :nome, equipamento = :equipamento, capacidade = :capacidade WHERE id_laboratorio = :id_laboratorio";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":equipamento", $equipamento);
        $stmt->bindParam(":capacidade", $capacidade);
        $stmt->bindParam(":id_laboratorio", $idLaboratorio);
    
        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "UPDATE", "Laboratório"); 
        }
        return $executar;
    }

    public function desativar($id)
    {
        $query = "UPDATE $this->table SET estado = 0 WHERE id_laboratorio = :id_laboratorio";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_laboratorio', $id, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "DEACTIVATED", "Laboratório");
        }
        return $executar;
    }

    public function ativar($id)
    {
        $query = "UPDATE $this->table SET estado = 1 WHERE id_laboratorio = :id_laboratorio";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_laboratorio', $id, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "ACTIVATED", "Laboratório");
        }
        return $executar;
    }
    
    public function deleteLaboratorio($idLaboratorio) {
        $query = "DELETE FROM $this->table WHERE id_laboratorio = :id_laboratorio";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_laboratorio", $idLaboratorio, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "DELETE", "Laboratório"); 
        }
        return $executar;
    }
}
