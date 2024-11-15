<?php
namespace App\Model;
use App\Database\Database;
use App\Model\Log;
use App\utils\AuthHelpers;
use PDO;

class Reserva {
    private $idReserva;
    private $idUsuario;
    private $idLaboratorio;
    private $idDisciplina;
    private $dataInicial;
    private $dataFinal;
    private $horarioInicial;
    private $horarioFinal;
    private $recorrencia;
    private $descricao;
    private $dataCad;
    private $status;
    private $conn;
    private $table = "reserva";
    private $log;
    private $helper;

    public function __construct() {
        $this->conn = Database::getInstance();
        $this->log = new Log();
        $this->helper = new AuthHelpers();
    }
    public function create(Reserva $reserva) {
        $query = "INSERT INTO $this->table (id_usuario, id_laboratorio, id_disciplina, data_inicial, data_final, horario_inicial, horario_final, recorrencia, descricao)
                  VALUES (:id_usuario, :id_laboratorio, :id_disciplina, :data_inicial, :data_final, :horario_inicial, :horario_final, :recorrencia, :descricao)";
        $stmt = $this->conn->prepare($query);
    
        $stmt->bindParam(":id_usuario", $reserva->getUsuarioId(), PDO::PARAM_INT);
        $stmt->bindParam(":id_laboratorio", $reserva->getLaboratorioId(), PDO::PARAM_INT);
        $stmt->bindParam(":id_disciplina", $reserva->getDisciplinaId(), PDO::PARAM_INT);
        $stmt->bindParam(":data_inicial", $reserva->getDataInicial());
        $stmt->bindParam(":data_final", $reserva->getDataFinal());
        $stmt->bindParam(":horario_inicial", $reserva->getHorarioInicial());
        $stmt->bindParam(":horario_final", $reserva->getHorarioFinal());
        $stmt->bindParam(":recorrencia", $reserva->getRecorrencia());
        $stmt->bindParam(":descricao", $reserva->getDescricao());
    
        $executado = $stmt->execute();
        
        if ($executado) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "INSERT", "Software");
        }
    
        return $executado;
    }
    

    public function getReservaId() {
        return $this->idReserva;
    }

    public function getUsuarioId() {
        return $this->idUsuario;
    }
    
    public function setUsuarioId($idUsuario) {
        $this->idUsuario = $idUsuario;
    }

    public function getLaboratorioId() {
        return $this->idLaboratorio;
    }
    
    public function setLaboratorioId($idLaboratorio) {
        $this->idLaboratorio = $idLaboratorio;
    }

    public function getDisciplinaId() {
        return $this->idDisciplina;
    }

    public function setDisciplinaId($idDisciplina) {
        $this->idDisciplina = $idDisciplina;
    }

    public function getDataInicial() {
        return $this->dataInicial;
    }
    
    public function setDataInicial($dataInicial) {
        $this->dataInicial = $dataInicial;
    }

    public function getDataFinal() {
        return $this->dataFinal;
    }

    public function setDataFinal($dataFinal) {
        $this->dataFinal = $dataFinal;
    }

    public function getHorarioInicial() {
        return $this->horarioInicial;
    }
    
    public function setHorarioInicial($horarioInicial) {
        $this->horarioInicial = $horarioInicial;
    }

    public function getHorarioFinal() {
        return $this->horarioFinal;
    }

    public function setHorarioFinal($horarioFinal) {
        $this->horarioFinal = $horarioFinal;
    }

    public function getDescricao() {
        return $this->descricao;
    }

    public function setDescricao($descricao) {
        $this->descricao = $descricao;
    }

    public function getRecorrencia() {
        return $this->recorrencia;
    }
    public function setRecorrencia($recorrencia) {
        $this->recorrencia = $recorrencia;
    }

    public function getDataCad() {
        return $this->dataCad;
    }
    public function setDataCad($dataCad) {
        $this->dataCad = $dataCad;
    }

    public function getStatus() {
        return $this->status;
    }
    public function setStatus($status) {
        $this->status = $status;
    } 
    
    public function obterTodasReservas() {
        $query = "SELECT * FROM $this->table";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function obterReservaPorId($id) {
        $query = "SELECT * FROM $this->table WHERE id_reserva = :id_reserva";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_reserva", $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function obterReservaPorEstado($estado) {
        $query = "SELECT * FROM $this->table WHERE status_reserva = :status_reserva";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":status_reserva", $estado);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function obterReservaPorLab($lab) {
        $query = "SELECT * FROM $this->table WHERE id_laboratorio = :id_laboratorio";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_laboratorio", $lab);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function obterReservaPorProf($prof) {
        $query = "SELECT * FROM $this->table WHERE id_usuario = :id_usuario";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_usuario", $prof);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function atualizarReserva(Reserva $Reserva, $idReserva) {
        $query = "UPDATE $this->table SET  id_usuario = :id_usuario, id_laboratorio = :id_laboratorio, id_disciplina = :id_disciplina, data_inicial = :data_inicial, data_final = :data_final, horario_inicial = :horario_inicial, horario_final = :horario_final, recorrencia = :recorrencia, descricao = :descricao, status_reserva = :status_reserva WHERE id_reserva = :id_reserva";
        $stmt = $this->conn->prepare($query);
        $idUsuario = $Reserva->getUsuarioId();
        $idLaboratorio = $Reserva->getLaboratorioId();
        $idDisciplina = $Reserva->getDisciplinaId();
        $dataInicial = $Reserva->getDataInicial();
        $dataFinal = $Reserva->getDataFinal();
        $horarioInicial = $Reserva->getHorarioInicial();
        $horarioFinal = $Reserva->getHorarioFinal();
        $recorrencia = $Reserva->getRecorrencia();
        $descricao = $Reserva->getDescricao();
        $dataCad = $Reserva->getDataCad();
        $status = $Reserva->getStatus();

        $stmt->bindParam(":id_usuario", $idUsuario);
        $stmt->bindParam(":id_laboratorio", $idLaboratorio);
        $stmt->bindParam(":id_disciplina", $idDisciplina);
        $stmt->bindParam(":data_inicial", $dataInicial);
        $stmt->bindParam(":data_final", $dataFinal);
        $stmt->bindParam(":horario_inicial", $horarioInicial);
        $stmt->bindParam(":horario_final", $horarioFinal);
        $stmt->bindParam(":recorrencia", $recorrencia);
        $stmt->bindParam(":descricao", $descricao);
        $stmt->bindParam(":status_reserva", $status);
        $stmt->bindParam(":id_reserva", $idReserva, PDO::PARAM_INT);
        
        if ($stmt->execute()) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "UPDATE", "Reserva"); 
        }

        return $stmt->execute();
    }

    public function obterReservaPorIntervaloDeData($dataini, $datafim) {
        $query = "SELECT * FROM $this->table WHERE data_inicial >= :data_inicial AND data_final <= :data_final";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":data_inicial", $dataini);
        $stmt->bindParam(":data_final", $datafim);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function excluirReservaPorID($id) {
        $query = "DELETE FROM $this->table WHERE id_reserva = :id_reserva";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_reserva", $id, PDO::PARAM_STR);

        if ($stmt->execute()) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "DELETE", "Reserva"); 
        }

        return $stmt->execute();
    }

    public function aprovarReserva($id) {
        $query = "UPDATE $this->table SET status_reserva = :status_reserva WHERE id_reserva = :id_reserva";
        $stmt = $this->conn->prepare($query);
        $status = 'aprovada'; 
        $stmt->bindParam(':status_reserva', $status);
        $stmt->bindParam(':id_reserva', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "UPDATE", "Reserva"); 
        }

        return $stmt->execute();
    }
    
    public function negarReserva($id) {
        $query = "UPDATE $this->table SET status_reserva = :status_reserva WHERE id_reserva = :id_reserva";
        $stmt = $this->conn->prepare($query);
        $status = 'negada'; 
        $stmt->bindParam(':status_reserva', $status);
        $stmt->bindParam(':id_reserva', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "UPDATE", "Reserva"); 
        }

        return $stmt->execute();
    }
    

}
