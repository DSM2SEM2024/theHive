<?php
namespace App\Model;
use App\Database\Database;
use PDO;

class Formulario {
    private $idResposta;
    private $semestre;
    private $disciplina;
    private $motivacao;
    private $atividade;
    private $equipamentos;

    private $conn;
    private $table = "Formulario";

    public function __construct() {
        $this->conn = Database::getInstance();
    }
    public function insertLaboratorio($formulario) {
        $idResposta = $formulario->getIdResposta();
        $semestre = $formulario->getSemestre();
        $disciplina = $formulario->getDisciplina();
        $motivacao = $formulario->getMotivacao();
        $atividade = $formulario->getatividade();
        $equipamentos = $formulario->getatividade();
        $query = "INSERT INTO $this->table (idRespostasForm, semestresForm, disciplinasForm, motivacoesForm, atividadesForm, equipamentosForm) VALUES (:semestreForm, :disciplinaForm, :motivacoesForm, :atividadesForm, :equipamentosForm)";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":semestre", $semestre);
        $stmt->bindParam(":disciplina", $disciplina);
        $stmt->bindParam(":motivacao", $motivacao);
        $stmt->bindParam(":atividade", $atividade);
        $stmt->bindParam(":equipamentos", $equipamentos);

        return $stmt->execute();
    }

    public function getIdResposta(){
        return $this->idLaboratorio;
    }

    public function setLaboratorioId($idLaboratorio): self{
        $this->idLaboratorio = $idLaboratorio;

        return $this;
    }

    public function getSemestre(){
        return $this->semestre;
    }

    public function setSemestre($semestre): self{
        $this->semestre = $semestre;

        return $this;
    }

    public function getDisciplina(){
        return $this->disciplina;
    }

    public function setDisciplina($disciplina): self{
        $this->disciplina = $disciplina;
        return $this;
    }

    public function getMotivacao() {
        return $this->motivacao;
    }

    public function setEquipamento($motivacao): self {
        $this->motivacao = $motivacao;
        return $this;
    }

    public function getatividade() {
        return $this->atividade;
    }
    
    public function setatividade($atividade): self {
        $this->atividade = $atividade;
        return $this;
    }

    public function getLaboratorioByName($semestre) {
        $query = "SELECT * FROM $this->table WHERE semestre = :semestre";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":semestre", $semestre);
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
        $idLaboratorio = $this->getIdResposta();
        $semestre = $this->getSemestre();
        $disciplina = $this->getDisciplina();
        $motivacao = $this->getMotivacao();
        $atividade = $this->getatividade();
        $query = "UPDATE $this->table SET semestre = :semestre, disciplina = :disciplina, motivacao = :motivacao, atividade = :atividade WHERE idLaboratorio = :idLaboratorio";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":semestre", $semestre);
        $stmt->bindParam(":disciplina", $disciplina);
        $stmt->bindParam(":motivacao", $motivacao);
        $stmt->bindParam(":atividade", $atividade);
        $stmt->bindParam(":idLaboratorio", $idLaboratorio);
    
        return $stmt->execute();
    }
    
    public function deleteLaboratorio($idLaboratorio) {
        $query = "DELETE FROM laboratorios WHERE idLaboratorio = :idLaboratorio";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":idLaboratorio", $idLaboratorio, PDO::PARAM_INT);
        return $stmt->execute();
    }
}