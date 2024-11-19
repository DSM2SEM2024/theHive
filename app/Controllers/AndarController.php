<?php
namespace App\Controllers;

use App\Model\Andar;
use App\utils\AuthHelpers;

class AndarController {
    private $andar;
    private $helper;

    public function __construct() {
        $this->andar = new Andar();
        $this->helper = new AuthHelpers();
    }

    public function create($data) {
        $this->helper->criar();
        if (!isset($data->nome, $data->cor)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para a criação do andar."]);
            return;
        }

        $this->andar->setNome($data->nome)->setCor($data->cor);

        if ($this->andar->criarAndar($this->andar)) {
            http_response_code(201);
            echo json_encode(["success" => true, "message" => "Andar criado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar andar."]);
        }
    }

    public function readAll() {
        $this->helper->visualizar();
        $andares = $this->andar->getAllAndar();
        if ($andares) {
            http_response_code(200);
            echo json_encode($andares);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Nenhum andar encontrado."]);
        }
    }

    public function readId($idAndar) {
        $this->helper->visualizar();
        $andar = $this->andar->getByIdAndar($idAndar);
        if ($andar) {
            http_response_code(200);
            echo json_encode($andar);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Andar não encontrado."]);
        }
    }

    public function readByEstado($andar) {
        $this->helper->visualizar();
        $andar = $this->andar->findByEstado($estado);
        if ($andar) {
            http_response_code(200);
            echo json_encode($andar);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Nenhum andar encontrado no estado informado."]);
        }
    }

    public function update($idAndar, $data) {
        $this->helper->atualizar();
        if (!isset($data->nome, $data->cor)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para a atualização do andar."]);
            return;
        }

        $this->andar->setNome($data->nome)->setCor($data->cor);

        if ($this->andar->updateAndar($idAndar)) {
            http_response_code(200);
            echo json_encode(["message" => "Andar atualizado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar andar."]);
        }
    }

    public function desativar($id)
    {
        $this->helper->desativar();
        $andar = $this->user->getByIdAndar($id);
        if ($andar) {
        $andar = $this->user->desativar($id);
        if ($andar) {
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
        $andar = $this->andar->getByIdAndar($id);
        if ($andar) {
        $andar = $this->andar->ativar($id);
        if ($andar) {
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

    public function delete($idAndar) {
        $this->helper->deletar();
        if ($this->andar->deleteAndar($idAndar)) {
            http_response_code(200);
            echo json_encode(["message" => "Andar excluído com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao excluir andar."]);
        }
    }
}
