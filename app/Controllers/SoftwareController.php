<?php
namespace App\Controllers;

use App\Model\Software;
use App\utils\AuthHelpers;


class SoftwareController {
    private $software;
    private $helper;

    public function __construct() {
        $this->helper = new AuthHelpers();
        $this->software = new Software();
    }
    public function create($data) {
        $this->helper->criar();

        if (!isset($data->nome)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para a criação do software."]);
            return;
        }

        $this->software->setNome($data->nome);
        if ($this->software->insertSoftware($this->software)) {
            http_response_code(201);
            echo json_encode(["success"=> true,"message" => "Software criado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar software."]);
        }
    }

    public function read($id = null) {
        $this->helper->visualizar();
        if ($id) {
            $result = $this->software->getSoftwareById($id);
            if($result){
                $status = 200 ;
            }else{
                $status = 404;
            }
            
            } else {
            $result = $this->software->getAllSoftwares();
            unset($equip);
            $status = !empty($result) ? 200 : 404;
        }

        http_response_code($status);
        echo json_encode($result ?: ["message" => "Nenhum software encontrado."]);
    }

    public function update($id, $data) {
        $this->helper->atualizar();
        
        if (!isset($data->nome)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para atualização do software."]);
            return;
        }
    
    $this->software->setNome($data->nome);
    
        if ($this->software->updateSoftware($id)) {
            http_response_code(200);
            echo json_encode(["message" => "Software atualizado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar software."]);
        }
    }

    public function desativar($id)
    {
        $this->helper->desativar();
        $software = $this->software->getSoftwareById($id);
        if ($software) {
        $software = $this->software->desativar($id);
        if ($software) {
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
        $software = $this->software->getSoftwareById($id);
        if ($software) {
        $software = $this->software->ativar($id);
        if ($software) {
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
        if ($this->software->deleteSoftware($id)) {
            http_response_code(200);
            echo json_encode(["message" => "Software excluído com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao excluir software."]);
        }
    }
}
?>
