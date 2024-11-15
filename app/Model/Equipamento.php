<?php

// Importa o arquivo de conexão com o banco de dados

namespace App\Model;
use PDO;
use App\Database\Database;
use App\utils\AuthHelpers;
use App\Model\Log;

class Equipamento {
    private $conn;
    private $log;
    private $helper;

    // Construtor: inicializa a conexão com o banco de dados
    public function __construct() {
        $this->conn = Database::getInstance();
        $this->log = new Log();
        $this->helper = new AuthHelpers();
    }
    // Método para criar um novo equipamento
    public function create($nome, $numero, $software) {
        // Prepara a consulta SQL para inserir um novo equipamento
        $stmt = $this->conn->prepare("INSERT INTO EQUIPAMENTO (nome, numero, sofware) VALUES (?, ?, ?)");

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "INSERT", "Equipamento"); 
        }
        return $executar([$nome, $numero, $software]);
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

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "UPDATE", "Equipamento"); 
        }
        return $executar([$nome, $numero, $software, $id]);
    }

    // Método para "deletar" um equipamento (soft delete - apenas altera o estado)
    public function delete($id) {
        // Prepara a consulta SQL para definir o estado do equipamento como inativo (0)
        $stmt = $this->conn->prepare("UPDATE EQUIPAMENTO SET estado = 0 WHERE id_equipamento = ?");
        // Executa a consulta com o ID do equipamento como parâmetro

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "DELETE", "Equipamento"); 
        }
        return $executar([$id]);
    }
}
?>
