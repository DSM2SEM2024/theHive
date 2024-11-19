<?php
namespace App\Model;
use PDO;
use App\Database\Database;
use App\utils\AuthHelpers;
use App\Model\Log;

class Equipamento {
    private $idEquipamento;
    private $nome;
    private $numero;
    private $software;
    private $estado;
    private $dataCad;
    private $table = "equipamento";
    private $conn;
    private $log;
    private $helper;

    public function __construct() {
        $this->conn = Database::getInstance();
        $this->log = new Log();
        $this->helper = new AuthHelpers();
    }

    public function getAllEquipamentos() {
        $query = "SELECT * FROM $this->table WHERE estado = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getEquipamentoById($idEquipamento) {
        $query = "SELECT * FROM $this->table WHERE id_equipamento = :id_equipamento";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_equipamento", $idEquipamento, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function insertEquipamento($equipamento) {
        $nome = $equipamento->getNome();
        $numero = $equipamento->getNumero();
        $software = $equipamento->getSoftware();
        $query = "INSERT INTO $this->table (nome, numero, id_software) VALUES (:nome, :numero, :id_software)";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":numero", $numero);
        $stmt->bindParam(":id_software", $software, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "INSERT", "Equipamento"); 
        }
        return $executar;
    }

    public function updateEquipamento($idEquipamento) {
        $nome = $this->getNome();
        $numero = $this->getNumero();
        $software = $this->getSoftware();
        $query = "UPDATE $this->table SET nome = :nome, numero = :numero, id_software = :id_software WHERE id_equipamento = :id_equipamento";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":numero", $numero);
        $stmt->bindParam(":id_software", $software, PDO::PARAM_INT);
        $stmt->bindParam(":id_equipamento", $idEquipamento);
    
        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "UPDATE", "Equipamento"); 
        }
        return $executar;
    }

    public function desativar($id)
    {
        $query = "UPDATE $this->table SET estado = 0 WHERE id_equipamento = :id_equipamento";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_equipamento', $id, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "DEACTIVATED", "Equipamento");
        }
        return $executar;
    }

    public function ativar($id)
    {
        $query = "UPDATE $this->table SET estado = 1 WHERE id_equipamento = :id_equipamento";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_equipamento', $id, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "ACTIVATED", "Equipamento");
        }
        return $executar;
    }

    public function deleteEquipamento($idEquipamento) {
        $query = "DELETE FROM $this->table WHERE id_equipamento = :id_equipamento";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_equipamento", $idEquipamento, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "DELETE", "Equipamento"); 
        }
        return $executar;
    }

    public function getEquipamentoId(){
        return $this->idEquipamento;
    }

    public function getNome(){
        return $this->nome;
    }

    public function setNome($nome): self{
        $this->nome = $nome;

        return $this;
    }

    public function getNumero(){
        return $this->numero;
    }

    public function setNumero($numero): self{
        $this->numero = $numero;
        return $this;
    }

    public function getSoftware() {
        return $this->software;
    }

    public function setSoftware($software): self {
        $this->software = $software;
        return $this;
    }
}
?>
