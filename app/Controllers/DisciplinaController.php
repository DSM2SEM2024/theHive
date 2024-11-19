<?php
namespace App\Controllers;

use App\Model\Disciplina;
use App\utils\AuthHelpers;

class DisciplinaController {
    private $disciplina;
    private $helper;

    public function __construct() {
        $this->disciplina = new Disciplina();
        $this->helper = new AuthHelpers();
    }

    // Função para criar uma nova disciplina
    public function create($data) {
        $this->helper->criar();
        if (!isset($data->nome)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para a criação da disciplina."]);
            return;
        }

        $this->disciplina->setCursoId($data->id_curso)
                         ->setNome($data->nome);

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
        $this->helper->visualizar();
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
        $this->helper->visualizar();
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
        $this->helper->visualizar();
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
        $this->helper->visualizar();
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
        $this->helper->atualizar();
        if (!isset($data->nome)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para a atualização da disciplina."]);
            return;
        }

        $this->disciplina->setCursoId($data->id_curso)->setNome($data->nome);

        if ($this->disciplina->updateDisciplina($idDisciplina)) {
            http_response_code(200);
            echo json_encode(["message" => "Disciplina atualizada com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar disciplina."]);
        }
    }

    public function desativar($id)
    {
        $this->helper->desativar();
        $disciplina = $this->disciplina->getByIdDisciplina($id);
        if ($disciplina) {
        $disciplina = $this->disciplina->desativar($id);
        if ($disciplina) {
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
        $disciplina = $this->disciplina->getByIdDisciplina($id);
        if ($disciplina) {
        $disciplina = $this->disciplina->ativar($id);
        if ($disciplina) {
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

    // Função para deletar uma disciplina
    public function delete($idDisciplina) {
        $this->helper->deletar();
        if ($this->disciplina->deleteDisciplina($idDisciplina)) {
            http_response_code(200);
            echo json_encode(["message" => "Disciplina excluída com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao excluir disciplina."]);
        }
    }
}
