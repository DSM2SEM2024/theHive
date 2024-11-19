<?php
namespace App\Model;
use App\Database\Database;
use App\Model\Log;
use App\utils\AuthHelpers;
use PDO;

class Disciplina {
    private $idDisciplina;
    private $idCurso;
    private $nome;
    private $estado;
    private $dataCad;
    private $conn;
    private $table = "disciplina";
    private $log;
    private $helper;

    public function __construct() {
        $this->conn = Database::getInstance();
        $this->log = new Log();
        $this->helper = new AuthHelpers();
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

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "CREATE", "Disciplina"); 
        }
        return $executar;
    }

    public function getAllDisciplina() {
        $query = "SELECT * FROM $this->table WHERE estado = 1";
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
    
    public function updateDisciplina($idDisciplina) {
        $query = "UPDATE $this->table SET id_curso = :id_curso, nome = :nome WHERE id_disciplina = :id_disciplina";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id_disciplina", $idDisciplina, PDO::PARAM_INT);
        $stmt->bindParam(":id_curso", $this->idCurso);
        $stmt->bindParam(":nome", $this->nome);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "UPDATE", "Disciplina"); 
        }
        return $executar;
    }

    public function desativar($id)
    {
        $query = "UPDATE $this->table SET estado = 0 WHERE id_disciplina = :id_disciplina";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_disciplina', $id, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "DEACTIVATED", "Disciplina");
        }
        return $executar;
    }

    public function ativar($id)
    {
        $query = "UPDATE $this->table SET estado = 1 WHERE id_disciplina = :id_disciplina";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id_disciplina', $id, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "ACTIVATED", "Disciplina");
        }
        return $executar;
    }

    

    public function deleteDisciplina($idDisciplina) {
        $query = "DELETE FROM $this->table WHERE id_disciplina = :id_disciplina";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_disciplina", $idDisciplina, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "DELETE", "Disciplina"); 
        }
        return $executar;
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
        $query = "SELECT * FROM $this->table WHERE id_curso = :id_curso AND estado = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_curso", $idCurso, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function desativarDisciplinasPorCurso($idCurso) {
        $query = "UPDATE DISCIPLINA SET estado = 0 WHERE id_curso = :id_curso";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_curso", $idCurso, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "DELETE", "Disciplina"); 
        }
        return $executar;
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