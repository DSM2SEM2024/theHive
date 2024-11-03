<?php
namespace App\Controllers;

use App\Model\Formulario;

class FormularioController {
    private $form;

    public function __construct() {
        $this->form = new Formulario();
    }
    public function create($data) {
        if (!isset($data->idResposta, $data->semestre, $data->disciplina, $data->motivacao, $data->atividade, $data->equipamentos)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para a criação do laboratório."]);
            return;
        }

        $this->form->setIdResposta($data->idResposta)->setSemestre($data->semestre)->setdisciplina($data->disciplina)->setMotivacao($data->motivacao)->setAtividade($data->atividade)->setEquipamentos($data->equipamentos);
        if ($this->form->insertFormulario($this->form)) {
            http_response_code(201);
            echo json_encode(["success"=> true,"message" => "Laboratório criado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar laboratório."]);
        }
    }

    // ajustar daqui pra baixo
    public function read($id = null) {
        if ($id) {
            $result = $this->form->getRespostaById($id);
            if($result){
                $status = 200 ;
            }else{
                $status = 404;
            }
            } else {
            $result = $this->form->getAllRespostas();
            unset($laboratorio);
            $status = !empty($result) ? 200 : 404;
        }

        http_response_code($status);
        echo json_encode($result ?: ["message" => "Nenhum laboratório encontrado."]);
    }

    public function update($id, $data) {
        if (!isset($id, $data->nome, $data->andar, $data->equipamento, $data->capacidade)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para atualização do laboratório."]);
            return;
        }

        $this->form->setIdResposta($data->idResposta)->setSemestre($data->semestre)->setdisciplina($data->disciplina)->setMotivacao($data->motivacao)->setAtividade($data->atividade)->setEquipamentos($data->equipamentos);

        if ($this->form->updateFormulario($this->form)) {
            http_response_code(200);
            echo json_encode(["message" => "Laboratório atualizado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar laboratório."]);
        }
    }

    public function delete($id) {
        if ($this->form->deleteLaboratorio($id)) {
            http_response_code(200);
            echo json_encode(["message" => "Laboratório excluído com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao excluir laboratório."]);
        }
    }
}
