<?php

// Importa a Model de Software para acessar os métodos de CRUD
namespace App\Controllers;

use App\Model\Software;

class SoftwareController {
    private $software;

    // Construtor: inicializa a instância da Model de Software
    public function __construct() {
        $this->software = new Software();
    }

    // Método para criar um novo software
    public function create() {
        // Lê o corpo da requisição e decodifica o JSON
        $data = json_decode(file_get_contents("php://input"), true);
        $nome = $data['nome'] ?? '';
        
        // Chama o método create na Model e retorna uma mensagem de sucesso
        $this->software->create($nome);
        echo json_encode(["message" => "Software criado com sucesso!"]);
    }

    // Método para listar todos os softwares
    public function read() {
        // Chama o método getAll na Model e retorna o resultado como JSON
        $result = $this->software->getAll();
        echo json_encode($result);
    }

    // Método para atualizar um software
    public function update($id) {
        // Lê o corpo da requisição e decodifica o JSON
        $data = json_decode(file_get_contents("php://input"), true);
        $nome = $data['nome'] ?? '';
        
        // Chama o método update na Model e retorna uma mensagem de sucesso
        $this->software->update($id, $nome);
        echo json_encode(["message" => "Software atualizado com sucesso!"]);
    }

    // Método para deletar (soft delete) um software
    public function delete($id) {
        // Chama o método delete na Model e retorna uma mensagem de sucesso
        $this->software->delete($id);
        echo json_encode(["message" => "Software deletado com sucesso!"]);
    }
}
?>
