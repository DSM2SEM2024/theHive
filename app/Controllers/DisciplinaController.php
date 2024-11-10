<?php

namespace App\Controllers;

use App\Model\Disciplina;

class DisciplinaController {
    private $disciplina;

    public function __construct() {
        $this->disciplina = new Disciplina();
    }

    // Função para criar uma nova disciplina
    public function create($data) {
        if (!isset($data->id_curso, $data->nome, $data->estado)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para a criação da disciplina."]);
            return;
        }

        $this->disciplina->setCursoId($data->id_curso)
                         ->setNome($data->nome)
                         ->setEstado($data->estado);

        if ($this->disciplina->criarDisciplina($this->disciplina)) {
            http_response_code(201);
            echo json_encode(["success" => true, "message" => "Disciplina criada com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar disciplina."]);
        }
    }

    // Função para listar todas as disciplinas
    public function readAll() {
        $disciplinas = $this->disciplina->getAllDisciplina();
        if ($disciplinas) {
            http_response_code(200);
            echo json_encode($disciplinas);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Nenhuma disciplina encontrada."]);
        }
    }

    // Função para listar disciplina por ID
    public function readId($idDisciplina) {
        $disciplina = $this->disciplina->getByIdDisciplina($idDisciplina);
        if ($disciplina) {
            http_response_code(200);
            echo json_encode($disciplina);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Disciplina não encontrada."]);
        }
    }

    // Função para listar disciplinas por curso
    public function readByCurso($idCurso) {
        $disciplinas = $this->disciplina->getByIdCurso($idCurso);
        if ($disciplinas) {
            http_response_code(200);
            echo json_encode($disciplinas);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Nenhuma disciplina encontrada para o curso informado."]);
        }
    }

    // Função para listar disciplinas por estado
    public function readByEstado($estado) {
        $disciplinas = $this->disciplina->findByEstado($estado);
        if ($disciplinas) {
            http_response_code(200);
            echo json_encode($disciplinas);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Nenhuma disciplina encontrada para o estado informado."]);
        }
    }

    // Função para atualizar uma disciplina
    public function update($idDisciplina, $data) {
        if (!isset($data->id_curso, $data->nome, $data->estado)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para a atualização da disciplina."]);
            return;
        }

        $this->disciplina->setCursoId($data->id_curso)
                         ->setNome($data->nome)
                         ->setEstado($data->estado);

        if ($this->disciplina->updateDisciplina($idDisciplina)) {
            http_response_code(200);
            echo json_encode(["message" => "Disciplina atualizada com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar disciplina."]);
        }
    }

    // Função para deletar uma disciplina
    public function delete($idDisciplina) {
        if ($this->disciplina->deleteDisciplina($idDisciplina)) {
            http_response_code(200);
            echo json_encode(["message" => "Disciplina excluída com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao excluir disciplina."]);
        }
    }
}
