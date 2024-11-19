<?php
namespace App\Controllers;

use App\Model\Curso;
use App\Model\Disciplina;
use App\utils\AuthHelpers;

class CursoController {
    private $curso;
    private $helper;

    public function __construct() {
        $this->curso = new Curso();
        $this->helper = new AuthHelpers();
    }

    public function create($data) {
        $this->helper->criar();
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
        $this->helper->visualizar();
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
        $this->helper->visualizar();
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
        $this->helper->desativar();
        // Chama o Model para desativar o curso
        $cursoModel = new Curso();
        $disciplinaModel = new Disciplina();
    
        $cursoModel->atualizarEstadoCurso($idCurso, 0);
        
        // Chama o Model para desativar as disciplinas associadas
        $disciplinaModel->desativarDisciplinasPorCurso($idCurso);
    }

    public function update($idCurso, $data) {
        $this->helper->atualizar();
        if (!isset($data->nome)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para a atualização do curso."]);
            return;
        }

        $this->curso->setNome($data->nome);

        if ($this->curso->update($idCurso)) {
            http_response_code(200);
            echo json_encode(["message" => "Curso atualizado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar curso."]);
        }
    }

    public function desativar($id)
    {
        $this->helper->desativar();
        $curso = $this->curso->getById($id);
        if ($curso) {
        $curso = $this->curso->desativar($id);
        if ($curso) {
            http_response_code(200);
            echo json_encode(['status' => true, 'mensagem' => 'Removido com sucesso.']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => false, 'mensagem' => 'Erro ao remover.']);
        }
        } else {
            http_response_code(404);
            echo json_encode(['status' => false, 'mensagem' => 'Não encontrado.']);
        }
    }  

    public function ativar($id)
    {
        $this->helper->ativar();
        $curso = $this->curso->getById($id);
        if ($curso) {
        $curso = $this->curso->ativar($id);
        if ($curso) {
            http_response_code(200);
            echo json_encode(['status' => true, 'mensagem' => 'Ativo com sucesso.']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => false, 'mensagem' => 'Erro ao ativar.']);
        }
        } else {
            http_response_code(404);
            echo json_encode(['status' => false, 'mensagem' => 'Não encontrado.']);
        }
    }

    public function delete($idCurso) {
        $this->helper->deletar();
        if ($this->curso->delete($idCurso)) {
            http_response_code(200);
            echo json_encode(["message" => "Curso excluído com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao excluir curso."]);
        }
    }

    
}