<?php
namespace App\Controllers;

use App\Model\Laboratorio;
use App\utils\AuthHelpers;

class LaboratorioController {
    private $lab;
    private $helper;

    public function __construct() {
        $this->lab = new Laboratorio();
        $this->helper = new AuthHelpers();
    }
    public function create($data) {
        $this->helper->criar();
        if (!isset($data->nome, $data->capacidade)) {
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
        $this->helper->visualizar();
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

    public function filterByNome($nomeLaboratorio) {
        $nomeLaboratorio = urldecode($nomeLaboratorio);
        $nomeUsuario = $this->prepareLikeParameter($nomeLaboratorio);
        $this->helper->visualizar();
        $result = $this->lab->getLaboratorioByName($nomeLaboratorio);
    
        if ($result) {
            http_response_code(200);
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Nenhum laboratório encontrado com o nome: $nomeLaboratorio"]);
        }
    }
    
    private function prepareLikeParameter($param) {
        return '%' . trim($param) . '%';
    }    

    public function filterLaboratorioByAndar($andar) {
        $this->helper->visualizar();
        if (empty($andar)) {
            http_response_code(400);
            echo json_encode(["error" => "O valor do andar não pode estar vazio."]);
            return;
        }

        $result = $this->lab->getLaboratorioByAndar($andar);

        if ($result) {
            http_response_code(200);
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Nenhum laboratório encontrado para o andar especificado."]);
        }
    }

    public function update($id, $data) {
        $this->helper->atualizar();
        if (!isset($data->nome, $data->capacidade)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para atualização do laboratório."]);
            return;
        }

        $this->lab->setNome($data->nome)->setEquipamento($data->equipamento)->setCapacidade($data->capacidade);

        if ($this->lab->updateLaboratorio($id)) {
            http_response_code(200);
            echo json_encode(["message" => "Laboratório atualizado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar laboratório."]);
        }
    }

    public function desativar($id)
    {
        $this->helper->desativar();
        $laboratorio = $this->lab->getLaboratorioById($id);
        if ($laboratorio) {
        $laboratorio = $this->lab->desativar($id);
        if ($laboratorio) {
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
        $laboratorio = $this->lab->getLaboratorioById($id);
        if ($laboratorio) {
        $laboratorio = $this->lab->ativar($id);
        if ($laboratorio) {
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
        if ($this->lab->deleteLaboratorio($id)) {
            http_response_code(200);
            echo json_encode(["message" => "Laboratório excluído com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao excluir laboratório."]);
        }
    }

    //adicionando a função de buscar laboratório por nome
   
}
