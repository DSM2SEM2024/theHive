<?php
namespace App\Controllers;

use App\Model\Laboratorio;

class LaboratorioController {
    private $lab;

    public function __construct() {
        $this->lab = new Laboratorio();
    }
    public function create($data) {
        if (!isset($data->nome, $data->andar, $data->capacidade)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para a criação do laboratório."]);
            return;
        }

        $this->lab->setNome($data->nome)->setAndar($data->andar)->setEquipamento($data->equipamento)->setCapacidade($data->capacidade);
        if ($this->lab->insertLaboratorio($this->lab)) {
            http_response_code(201);
            echo json_encode(["success"=> true,"message" => "Laboratório criado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar laboratório."]);
        }
    }

    public function read($id = null) {
        if ($id) {
            $result = $this->lab->getLaboratorioById($id);
            if($result){
                $status = 200 ;
            }else{
                $status = 404;
            }
            } else {
            $result = $this->lab->getAllLaboratorios();
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

        $this->lab->setLaboratorioId($id)->setNome($data->nome)->setAndar($data->andar)->setEquipamento($data->equipamento)->setCapacidade($data->capacidade);

        if ($this->lab->updateLaboratorio()) {
            http_response_code(200);
            echo json_encode(["message" => "Laboratório atualizado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar laboratório."]);
        }
    }

    public function delete($id) {
        if ($this->lab->deleteLaboratorio($id)) {
            http_response_code(200);
            echo json_encode(["message" => "Laboratório excluído com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao excluir laboratório."]);
        }
    }
}
