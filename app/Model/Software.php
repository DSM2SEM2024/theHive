<?php

// Importa o arquivo de conexão com o banco de dados

namespace App\Model;
use PDO;
use App\Database\Database;

class Software {
    private $conn;

    // Construtor: inicializa a conexão com o banco de dados
    public function __construct() {
        $this->conn = Database::getInstance();
    }
    // Método para criar um novo software
    public function create($nome) {
        // Prepara a consulta SQL para inserir um novo software
        $stmt = $this->conn->prepare("INSERT INTO SOFTWARE (nome) VALUES (?)");
        // Executa a consulta com o nome do software passado como parâmetro
        return $stmt->execute([$nome]);
    }

    // Método para buscar todos os softwares ativos
    public function getAll() {
        // Executa a consulta SQL para buscar todos os softwares com estado ativo (1)
        $stmt = $this->conn->query("SELECT * FROM SOFTWARE WHERE estado = 1");
        // Retorna o resultado como um array associativo
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Método para atualizar um software existente
    public function update($id, $nome) {
        // Prepara a consulta SQL para atualizar o nome de um software com base no ID
        $stmt = $this->conn->prepare("UPDATE SOFTWARE SET nome = ? WHERE id_software = ?");
        // Executa a consulta com o novo nome e o ID do software como parâmetros
        return $stmt->execute([$nome, $id]);
    }

    // Método para "deletar" um software (soft delete - apenas altera o estado)
    public function delete($id) {
        // Prepara a consulta SQL para definir o estado do software como inativo (0)
        $stmt = $this->conn->prepare("UPDATE SOFTWARE SET estado = 0 WHERE id_software = ?");
        // Executa a consulta com o ID do software como parâmetro
        return $stmt->execute([$id]);
    }
}
?>
