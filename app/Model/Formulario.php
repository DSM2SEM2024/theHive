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
    public function insertFormulario($formulario) {
        $semestre = $formulario->getSemestre();
        $disciplina = $formulario->getDisciplina();
        $motivacao = $formulario->getMotivacao();
        $atividade = $formulario->getatividade();
        $equipamentos = $formulario->getEquipamentos();
        $query = "INSERT INTO $this->table (semestresForm, disciplinasForm, motivacoesForm, atividadesForm, equipamentosForm) VALUES (:semestres, :disciplinas, :motivacoes, :atividades, :equipamentos)";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":semestres", $semestre);
        $stmt->bindParam(":disciplinas", $disciplina);
        $stmt->bindParam(":motivacoes", $motivacao);
        $stmt->bindParam(":atividades", $atividade);
        $stmt->bindParam(":equipamentos", $equipamentos);

        return $stmt->execute();
    }

    public function getIdResposta(){
        return $this->idResposta;
    }

    public function setidResposta($idResposta): self{
        $this->idResposta = $idResposta;

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

    public function setMotivacao($motivacao): self {
        $this->motivacao = $motivacao;
        return $this;
    }

    public function getAtividade() {
        return $this->atividade;
    }
    
    public function setAtividade($atividade): self {
        $this->atividade = $atividade;
        return $this;
    }
    
    public function getEquipamentos() {
        return $this->equipamentos;
    }
    
    public function setEquipamentos($equipamentos): self {
        $this->equipamentos = $equipamentos;
        return $this;
    }

    public function getRespostaById($idResposta) {
        $query = "SELECT * FROM $this->table WHERE idRespostaForm = :idResposta";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":idResposta", $idResposta);
        $stmt->execute();
    
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    

    public function getAllRespostas() {
        $query = "SELECT * FROM $this->table";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getRespostaBySem($semestre) {
        $query = "SELECT * FROM $this->table WHERE semestreForm = :semestre";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":semestre", $semestre, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updateFormulario() {
        $idResposta = $this->getIdResposta();
        $semestre = $this->getSemestre();
        $disciplina = $this->getDisciplina();
        $motivacao = $this->getMotivacao();
        $atividade = $this->getatividade();
        $query = "UPDATE $this->table SET semestreForm = :semestre, disciplinaForm = :disciplina, motivacaoForm = :motivacao, atividadeForm = :atividade, equipamentosForm = :equipamento WHERE idRespostasForm = :idResposta";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":semestre", $semestre);
        $stmt->bindParam(":disciplina", $disciplina);
        $stmt->bindParam(":motivacao", $motivacao);
        $stmt->bindParam(":atividade", $atividade);
        $stmt->bindParam(":idLaboratorio", $idLaboratorio);
        $stmt->bindParam(":equipamentos", $equipamento);

        return $stmt->execute();
    }
    
    public function deleteResposta($idResposta) {
        $query = "DELETE FROM $this->table WHERE idRespostasForm = :idRespostas";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":idRespostas", $idResposta, PDO::PARAM_INT);
        return $stmt->execute();
    }
}