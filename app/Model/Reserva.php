<?php
namespace App\Model;
use App\Database\Database;
use PDO;

class Reserva {
    private $idReserva;
    private $usuarioId;
    private $laboratorioId;
    private $dataReserva;
    private $respostasFormulario;
    private $estado;
    private $conn;
    private $table = "reservas";

    public function __construct() {
        $this->conn = Database::getInstance();
    }

    // Método para criar uma nova reserva
    public function criarReserva($usuarioId, $laboratorioId, $respostasFormulario, $dataReserva, $estado) {
        $query = "INSERT INTO $this->table (usuario_id, laboratorio_id, respostas_id, data_reserva, estado) 
                  VALUES (:usuario_id, :laboratorio_id, :respostas_id, :data_reserva, :estado)";    
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":usuario_id", $usuarioId);
        $stmt->bindParam(":laboratorio_id", $laboratorioId);
        $stmt->bindParam(":respostas_id", $respostasFormulario);
        $stmt->bindParam(":data_reserva", $dataReserva);
        $stmt->bindParam(":estado", $estado);

        return $stmt->execute();
    }

    // Método para buscar reserva por ID
    public function getReservaById($idReserva) {
        $query = "SELECT * FROM $this->table WHERE id_reserva = :id_reserva";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_reserva", $idReserva);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Método para buscar todas as reservas
    public function getAllReservas() {
        $query = "SELECT * FROM $this->table";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Método para atualizar uma reserva
    public function updateReserva($idReserva, $estado) {
        $query = "UPDATE $this->table SET estado = :estado WHERE id_reserva = :id_reserva";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":estado", $estado);
        $stmt->bindParam(":id_reserva", $idReserva, PDO::PARAM_INT);

        return $stmt->execute();
    }

    // Método para excluir uma reserva
    public function deleteReserva($idReserva) {
        $query = "DELETE FROM $this->table WHERE id_reserva = :id_reserva";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_reserva", $idReserva, PDO::PARAM_INT);

        return $stmt->execute();
    }

    // Getters e Setters
    public function getIdReserva() {
        return $this->idReserva;
    }

    public function setIdReserva($idReserva): self {
        $this->idReserva = $idReserva;
        return $this;
    }

    public function getUsuarioId() {
        return $this->usuarioId;
    }

    public function setUsuarioId($usuarioId): self {
        $this->usuarioId = $usuarioId;
        return $this;
    }

    public function getLaboratorioId() {
        return $this->laboratorioId;
    }

    public function setLaboratorioId($laboratorioId): self {
        $this->laboratorioId = $laboratorioId;
        return $this;
    }

    public function getDataReserva() {
        return $this->dataReserva;
    }

    public function setDataReserva($dataReserva): self {
        $this->dataReserva = $dataReserva;
        return $this;
    }

    public function getEstado() {
        return $this->estado;
    }

    public function setEstado($estado): self {
        $this->estado = $estado;
        return $this;
    }
}
?>
