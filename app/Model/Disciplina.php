<?php
namespace App\Model;
use App\Database\Database;
use PDO;

class Disciplina {
    private $idDisciplina;
    private $idCurso;
    private $nome;
    private $estado;
    private $dataCad;
    private $conn;
    private $table = "disciplina";

    public function __construct() {
        $this->conn = Database::getInstance();
    }

    public function criarDisciplina(Disciplina $disciplina) {
        $query = "INSERT INTO $this->table (id_curso, nome)
                  VALUES (:id_curso, :nome)";
        $stmt = $this->conn->prepare($query);
    
        $idDisciplina = $disciplina->getdisciplinaId();
        $idCurso = $disciplina->getCursoid();
        $nome = $disciplina->getNome();
        $estado = $disciplina->getEstado();
        $dataCad = $disciplina->getDataCad();
    
        $stmt->bindParam(":id_curso", $idCurso);
        $stmt->bindParam(":nome", $nome);

        return $stmt->execute();
    }

    public function getAllDisciplina() {
        $query = "SELECT * FROM $this->table";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getByIdDisciplina($idDisciplina) {
        $query = "SELECT * FROM $this->table WHERE id_disciplina = :id_disciplina";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_disciplina", $idDisciplina, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    public function updateDisciplina() {
        $query = "UPDATE $this->table SET id_curso = :id_curso, nome = :nome, estado = :estado, data_cad = :data_cad
                  WHERE id_disciplina = :id_disciplina";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id_disciplina", $this->idDisciplina, PDO::PARAM_INT);
        $stmt->bindParam(":id_curso", $this->idCurso);
        $stmt->bindParam(":nome", $this->nome);
        $stmt->bindParam(":estado", $this->estado);
        $stmt->bindParam(":data_cad", $this->dataCad);

        return $stmt->execute();
    }

    public function deleteDisciplina($idDisciplina) {
        $query = "DELETE FROM $this->table WHERE id_disciplina = :id_disciplina";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_disciplina", $idDisciplina, PDO::PARAM_INT);

        return $stmt->execute();
    }

    // Método para listar disciplinas com base em seu estado
    public function findByEstado($estado) {
        $query = "SELECT * FROM $this->table WHERE estado = :estado";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":estado", $estado, PDO::PARAM_STR);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Método para listar disciplinas associadas a um curso específico
    public function getByIdCurso($idCurso) {
        $query = "SELECT * FROM $this->table WHERE id_curso = :id_curso";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_curso", $idCurso, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function desativarDisciplinasPorCurso($idCurso) {
        $query = "UPDATE DISCIPLINA SET estado = 0 WHERE id_curso = :id_curso";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_curso", $idCurso, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function getDisciplinaId() {
        return $this->idDisciplina;
    }

    public function getCursoId() {
        return $this->idCurso;
    }
    public function setCursoId($idCurso): self {
        $this->idCurso = $idCurso;
        return $this;
    }

    public function getNome() {
        return $this->nome;
    }
    public function setNome($nome): self {
        $this->nome = $nome;
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

// getIdDisciplina() - para acessar o valor de $idDisciplina.
// setIdDisciplina($idDisciplina) - para definir o valor de $idDisciplina (se necessário).
// getIdCurso() - já está presente.
// setIdCurso($idCurso) - já está presente.
// getNome() - já está presente.
// setNome($nome) - já está presente.
// getEstado() - já está presente.
// setEstado($estado) - já está presente.
// getDataCad() - já está presente.
// setDataCad($dataCad) - para definir a data de cadastro (caso precise, mas pode ser opcional se a data for gerada automaticamente).


// métodos para disciplina

// getAllDisciplina() - para listar todas as disciplinas.
// getByIdDisciplina($idDisciplina) - para encontrar uma disciplina por seu ID.
// updateDisciplina() - para atualizar os dados de uma disciplina existente.
// deleteDisciplina($idDisciplina) - para remover uma disciplina do banco de dados.
// getByIdCurso($idCurso) - para listar disciplinas associadas a um curso específico.
// findByEstado($estado) - para listar disciplinas com base em seu estado (ativo/inativo, por exemplo).