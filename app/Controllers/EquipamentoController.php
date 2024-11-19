<?php
namespace App\Controllers;

use App\Model\Equipamento;
use App\utils\AuthHelpers;

class EquipamentoController {
    private $equip;
    private $helper;

    public function __construct() {
        $this->equip = new Equipamento();
        $this->helper = new AuthHelpers();
    }

    public function create($data) {
        $this->helper->criar();

        if (!isset($data->nome, $data->numero)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para a criação do equipamento."]);
            return;
        }

        $this->equip->setNome($data->nome)->setNumero($data->numero)->setSoftware($data->software);
        if ($this->equip->insertEquipamento($this->equip)) {
            http_response_code(201);
            echo json_encode(["success"=> true,"message" => "Equipamento criado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar Equipamento."]);
        }
    }

    public function read($id = null) {
        $this->helper->visualizar();
        if ($id) {
            $result = $this->equip->getEquipamentoById($id);
            if($result){
                $status = 200 ;
            }else{
                $status = 404;
            }
            
            } else {
            $result = $this->equip->getAllEquipamentos();
            unset($equip);
            $status = !empty($result) ? 200 : 404;
        }

        http_response_code($status);
        echo json_encode($result ?: ["message" => "Nenhum equipamento encontrado."]);
    }

    public function update($id, $data) {
        $this->helper->atualizar();
        
        if (!isset($data->nome, $data->numero)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para atualização do equipamento."]);
            return;
        }
    
    $this->equip->setNome($data->nome)->setNumero($data->numero)->setSoftware($data->software);
    
        if ($this->equip->updateEquipamento($id)) {
            http_response_code(200);
            echo json_encode(["message" => "Equipamento atualizado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar equipamento."]);
        }
    }

    public function desativar($id)
    {
        $this->helper->desativar();
        $equipamento = $this->equip->getEquipamentoById($id);
        if ($equipamento) {
        $equipamento = $this->equip->desativar($id);
        if ($equipamento) {
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
        $equipamento = $this->equip->getEquipamentoById($id);
        if ($equipamento) {
        $equipamento = $this->equip->ativar($id);
        if ($equipamento) {
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

    public function delete($id) {
        $this->helper->deletar();
        if ($this->equip->deleteEquipamento($id)) {
            http_response_code(200);
            echo json_encode(["message" => "Equipamento excluído com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao excluir equipamento."]);
        }
    }
}
?>
