<?php

// Importa o arquivo de conexão com o banco de dados

namespace App\Model;
use PDO;
use App\Database\Database;
use App\Model\Log;

class Equipamento {
    private $conn;
    private $log;

    // Construtor: inicializa a conexão com o banco de dados
    public function __construct() {
        $this->conn = Database::getInstance();
        $this->log = new Log();
    }
    // Método para criar um novo equipamento
    public function create($nome, $numero, $software) {
        // Prepara a consulta SQL para inserir um novo equipamento
        $stmt = $this->conn->prepare("INSERT INTO EQUIPAMENTO (nome, numero, sofware) VALUES (?, ?, ?)");
        // Executa a consulta com os valores de nome, número e software passados como parâmetros

        if ($stmt->execute()) {
            $usuario_id = $_SESSION['usuario_id'];
            $this->log->registrar($usuario_id, "INSERT");
        }

        return $stmt->execute([$nome, $numero, $software]);
    }

    // Método para buscar todos os equipamentos ativos
    public function getAll() {
        // Executa a consulta SQL para buscar todos os equipamentos com estado ativo (1)
        $stmt = $this->conn->query("SELECT * FROM EQUIPAMENTO WHERE estado = 1");
        // Retorna o resultado como um array associativo
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Método para atualizar um equipamento existente
    public function update($id, $nome, $numero, $software) {
        // Prepara a consulta SQL para atualizar os dados do equipamento com base no ID
        $stmt = $this->conn->prepare("UPDATE EQUIPAMENTO SET nome = ?, numero = ?, sofware = ? WHERE id_equipamento = ?");
        // Executa a consulta com os valores de nome, número, software e ID como parâmetros

        if ($stmt->execute()) {
            $usuario_id = $_SESSION['usuario_id'];
            $this->log->registrar($usuario_id, "UPDATE");
        }

        return $stmt->execute([$nome, $numero, $software, $id]);
    }

    // Método para "deletar" um equipamento (soft delete - apenas altera o estado)
    public function delete($id) {
        // Prepara a consulta SQL para definir o estado do equipamento como inativo (0)
        $stmt = $this->conn->prepare("UPDATE EQUIPAMENTO SET estado = 0 WHERE id_equipamento = ?");
        // Executa a consulta com o ID do equipamento como parâmetro

        if ($stmt->execute()) {
            $usuario_id = $_SESSION['usuario_id'];
            $this->log->registrar($usuario_id, "DELETE");
        }

        return $stmt->execute([$id]);
    }
}
?>
