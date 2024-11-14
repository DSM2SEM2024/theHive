<?php
namespace App\Model;
use App\Database\Database;
USE App\Controllers\LogDb;
use PDO;

class Laboratorio {
    private $idLaboratorio;
    private $nome;
    private $andar;
    private $equipamento;
    private $capacidade;
    private $conn;
    private $table = "Laboratorio";

    private $logDB;
    private $id;

    public function __construct() {
        $this->conn = Database::getInstance();
        $this->logDB = new LogDb();
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

    
        $this->id = $idLaboratorio;
        $this->LogDb->log("INSERT", $this->table , $_SESSION["user"]);

        return $stmt->execute();
    }

    public function getLaboratorioId(){
        return $this->idLaboratorio;
    }

    public function setLaboratorioId($idLaboratorio): self{
        $this->idLaboratorio = $idLaboratorio;

        return $this;
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
        $query = "SELECT * FROM $this->table WHERE nome = :nome";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $nome);
        $stmt->execute();
    
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    

    public function getAllLaboratorios() {
        $query = "SELECT * FROM $this->table";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getLaboratorioById($idLaboratorio) {
        $query = "SELECT * FROM $this->table WHERE idLaboratorio = :idLaboratorio";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":idLaboratorio", $idLaboratorio, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updateLaboratorio() {
        $idLaboratorio = $this->getLaboratorioId();
        $nome = $this->getNome();
        $andar = $this->getAndar();
        $equipamento = $this->getEquipamento();
        $capacidade = $this->getCapacidade();
        $query = "UPDATE $this->table SET nome = :nome, andar = :andar, equipamento = :equipamento, capacidade = :capacidade WHERE idLaboratorio = :idLaboratorio";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":andar", $andar);
        $stmt->bindParam(":equipamento", $equipamento);
        $stmt->bindParam(":capacidade", $capacidade);
        $stmt->bindParam(":idLaboratorio", $idLaboratorio);
    
        
        $this->id = $idLaboratorio;
        $this->LogDb->log("UPDATE", $this->table , $_SESSION["user"], $id);

        return $stmt->execute();
    }
    
    public function deleteLaboratorio($idLaboratorio) {
        $query = "DELETE FROM $this->table WHERE idLaboratorio = :idLaboratorio";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":idLaboratorio", $idLaboratorio, PDO::PARAM_INT);
        
        $this->id = $idLaboratorio;
        $this->LogDb->log("DELETE", $this->table , $_SESSION["user"], $id);

        return $stmt->execute();
    }
}
