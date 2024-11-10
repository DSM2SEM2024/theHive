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
        $query = "INSERT INTO $this->table (id_disciplina, id_curso, nome, estado, data_cad)
                  VALUES (:id_disciplina, :id_curso, :nome, :estado, :data_cad)";
        $stmt = $this->conn->prepare($query);
    
        $idDisciplina = $disciplina->getdisciplinaId();
        $idCurso = $disciplina->getCursoid();
        $nome = $disciplina->getNome();
        $estado = $disciplina->getEstado();
        $dataCad = $disciplina->getDataCad();
        
    
        $stmt->bindParam(":id_disciplina", $idDisciplina);
        $stmt->bindParam(":id_curso", $idCurso);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":estado", $estado);
        $stmt->bindParam(":data_cad", $dataCad);
        
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

// findAll() - para listar todas as disciplinas.
// findById($idDisciplina) - para encontrar uma disciplina por seu ID.
// create() - para criar uma nova disciplina no banco de dados.
// update() - para atualizar os dados de uma disciplina existente.
// delete($idDisciplina) - para remover uma disciplina do banco de dados.
// findByCursoId($idCurso) - para listar disciplinas associadas a um curso específico.
// findByEstado($estado) - para listar disciplinas com base em seu estado (ativo/inativo, por exemplo).