<?php

namespace App\Controllers;

// Importa a Model de Equipamento para acessar os métodos de CRUD
use App\Model\Equipamento;

class EquipamentoController {
    private $equipamento;

    // Construtor: inicializa a instância da Model de Equipamento
    public function __construct() {
        $this->equipamento = new Equipamento();
    }

    // Método para criar um novo equipamento
    public function create() {
        // Lê o corpo da requisição e decodifica o JSON
        $data = json_decode(file_get_contents("php://input"), true);
        $nome = $data['nome'] ?? '';
        $numero = $data['numero'] ?? '';
        $software = $data['sofware'] ?? '';
        
        // Chama o método create na Model e retorna uma mensagem de sucesso
        $this->equipamento->create($nome, $numero, $software);
        echo json_encode(["message" => "Equipamento criado com sucesso!"]);
    }

    // Método para listar todos os equipamentos
    public function read() {
        // Chama o método getAll na Model e retorna o resultado como JSON
        $result = $this->equipamento->getAll();
        echo json_encode($result);
    }

    // Método para atualizar um equipamento
    public function update($id) {
        // Lê o corpo da requisição e decodifica o JSON
        $data = json_decode(file_get_contents("php://input"), true);
        $nome = $data['nome'] ?? '';
        $numero = $data['numero'] ?? '';
        $software = $data['sofware'] ?? '';
        
        // Chama o método update na Model e retorna uma mensagem de sucesso
        $this->equipamento->update($id, $nome, $numero, $software);
        echo json_encode(["message" => "Equipamento atualizado com sucesso!"]);
    }

    // Método para deletar (soft delete) um equipamento
    public function delete($id) {
        // Chama o método delete na Model e retorna uma mensagem de sucesso
        $this->equipamento->delete($id);
        echo json_encode(["message" => "Equipamento deletado com sucesso!"]);
    }
}
?>
