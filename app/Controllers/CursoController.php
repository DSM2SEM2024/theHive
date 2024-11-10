<?php
namespace App\Controllers;

use App\Model\Curso;
use App\Model\Disciplina;

class CursoController {
    private $curso;

    public function __construct() {
        $this->curso = new Curso();
    }

    public function create($data) {
        if (!isset($data->nome)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para a criação do curso."]);
            return;
        }

        $this->curso->setNome($data->nome);

        if ($this->curso->create()) {
            http_response_code(201);
            echo json_encode(["success" => true, "message" => "Curso criado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar curso."]);
        }
    }
   
    // função para obter(gets) os cursos
    public function readAll() {
        $cursos = $this->curso->getAll();
        if ($cursos) {
            http_response_code(200);
            echo json_encode($cursos);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Nenhum curso encontrado."]);
        }
    }

    // Função para listar curso por ID
    public function read($idCurso) {
        $curso = $this->curso->getById($idCurso);
        if ($curso) {
            http_response_code(200);
            echo json_encode($curso);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Curso não encontrado."]);
        }
    }

    //AQUI Lucas
    // ativar curso
    // desativar
    public function desativarCurso($idCurso) {
        // Chama o Model para desativar o curso
        $cursoModel = new Curso();
        $disciplinaModel = new Disciplina();
    
        $cursoModel->atualizarEstadoCurso($idCurso, 0);
        
        // Chama o Model para desativar as disciplinas associadas
        $disciplinaModel->desativarDisciplinasPorCurso($idCurso);
    }

    public function update($idCurso, $data) {
        if (!isset($data->nome, $data->estado, $data->data_cad)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para a atualização do curso."]);
            return;
        }

        $this->curso->setNome($data->nome)
                    ->setEstado($data->estado)
                    ->setDataCad($data->data_cad);

        if ($this->curso->update($idCurso)) {
            http_response_code(200);
            echo json_encode(["message" => "Curso atualizado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar curso."]);
        }
    }

    public function delete($idCurso) {
        if ($this->curso->delete($idCurso)) {
            http_response_code(200);
            echo json_encode(["message" => "Curso excluído com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao excluir curso."]);
        }
    }

    
}