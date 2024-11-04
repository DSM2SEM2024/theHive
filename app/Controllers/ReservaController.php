<?php
namespace App\Controllers;

use App\Model\Reserva;

class ReservaController {
    private $reservaModel;

    public function __construct() {
        $this->reservaModel = new Reserva();
    }

    public function create($data) {

        if (!isset($data['usuario_id'], $data['laboratorio_id'], $data['respostas_id'], $data['data_reserva'])) {
            http_response_code(400);
            echo json_encode(["error" => "Todos os campos são obrigatórios."]);
            return;
        }

        $usuarioId = $data['usuario_id'];
        $laboratorioId = $data['laboratorio_id'];
        $respostasFormulario = $data['respostas_id'];
        $dataReserva = $data['data_reserva'];
        $estado = "pendente";
        
        $resultado = $this->reservaModel->criarReserva($usuarioId, $laboratorioId, $respostasFormulario, $dataReserva, $estado);
        
        if (isset($resultado['error'])) {
            http_response_code(500);
        } else {
            http_response_code(201);
        }
        
        echo json_encode($resultado);
    }

    public function read($id = null) {
        if ($id) {
            $result = $this->reservaModel->getReservaById($id);
            $status = $result ? 200 : 404;
        } else {
            $result = $this->reservaModel->getAllReservas();
            $status = !empty($result) ? 200 : 404;
        }

        http_response_code($status);
        echo json_encode($result ?: ["message" => "Nenhuma reserva encontrada."]);
    }

    public function update($id, $data) {
        if (!isset($id, $data->estado)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para atualização da reserva."]);
            return;
        }

        if ($this->reservaModel->updateReserva($id, $data->estado)) {
            http_response_code(200);
            echo json_encode(["message" => "Reserva atualizada com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar reserva."]);
        }
    }

    public function delete($id) {
        if ($this->reservaModel->deleteReserva($id)) {
            http_response_code(200);
            echo json_encode(["message" => "Reserva excluída com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao excluir reserva."]);
        }
    }
}
?>