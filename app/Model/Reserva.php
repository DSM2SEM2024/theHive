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
        $iduser =  $reserva->getUsuarioId();
        $id_laboratorio = $reserva->getLaboratorioId();
        $id_disciplina = $reserva->getDisciplinaId();
        $data_inicial = $reserva->getDataInicial();
        $data_final= $reserva->getDataFinal();
        $horario_inicial= $reserva->getHorarioInicial();
        $horario_final= $reserva->getHorarioFinal();
        $recorrencia= $reserva->getRecorrencia();
        $descricao= $reserva->getDescricao();
        $query = "INSERT INTO $this->table (id_usuario, id_laboratorio, id_disciplina, data_inicial, data_final, horario_inicial, horario_final, recorrencia, descricao)
                  VALUES (:id_usuario, :id_laboratorio, :id_disciplina, :data_inicial, :data_final, :horario_inicial, :horario_final, :recorrencia, :descricao)";
        $stmt = $this->conn->prepare($query);
    
        $stmt->bindParam(":id_usuario", $iduser, PDO::PARAM_INT);
        $stmt->bindParam(":id_laboratorio", $id_laboratorio, PDO::PARAM_INT);
        $stmt->bindParam(":id_disciplina", $id_disciplina, PDO::PARAM_INT);
        $stmt->bindParam(":data_inicial", $data_inicial);
        $stmt->bindParam(":data_final", $data_final);
        $stmt->bindParam(":horario_inicial", $horario_inicial);
        $stmt->bindParam(":horario_final", $horario_final);
        $stmt->bindParam(":recorrencia", $recorrencia);
        $stmt->bindParam(":descricao", $descricao);
    
        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "INSERT", "Software");
        }
    
        return $executar;
    }

    public function getReservaId() {
        return $this->idReserva;
    }

    public function setReservaId($idReserva) {
        $this->idReserva = $idReserva;
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
        $query = "SELECT * FROM $this->table WHERE id_reserva = :id_reserva AND status_reserva != 'cancelada'";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_reserva", $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function obterReservaPorEstado($estado) {
        $query = "SELECT * FROM $this->table WHERE status_reserva = :status_reserva AND status_reserva != 'cancelada'";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":status_reserva", $estado);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function obterReservaPorProfeEstado($prof, $estado) {
        $query = "SELECT * FROM $this->table WHERE status_reserva = :status_reserva AND id_usuario = :id_usuario";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_usuario", $prof);
        $stmt->bindParam(":status_reserva", $estado);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function obterReservaPorLab($lab) {
        $query = "SELECT * FROM $this->table WHERE id_laboratorio = :id_laboratorio AND status_reserva != 'cancelada'";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_laboratorio", $lab);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function obterReservaPorProf($prof) {
        $query = "SELECT * FROM $this->table WHERE id_usuario = :id_usuario AND status_reserva != 'cancelada'";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_usuario", $prof);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
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
        
        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "UPDATE", "Reserva"); 
        }
        return $executar;
    }

    public function obterReservaPorIntervaloDeData($dataini, $datafim) {
        $query = "SELECT * FROM $this->table WHERE data_inicial >= :data_inicial AND data_final <= :data_final";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":data_inicial", $dataini);
        $stmt->bindParam(":data_final", $datafim);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function verificarDisponibilidade($idlaboratorio, $dataini, $datafim, $horaioini, $horafim ) {
        // var_dump($datafim);
        // var_dump($horaioini);
        // var_dump($horafim);exit;
        $query = "SELECT * FROM reservas.reserva where id_laboratorio = :idlaboratorio and status_reserva='aprovada' and data_inicial between :data_inicial and :data_final and horario_inicial between :horaioini and :horafim";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":idlaboratorio", $idlaboratorio, PDO::PARAM_INT);
        $stmt->bindParam(":data_final", $datafim);
        $stmt->bindParam(":data_inicial", $dataini);
        $stmt->bindParam(":horaioini", $horaioini);
        $stmt->bindParam(":horafim", $horafim);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    public function excluirReservaPorID($id) {
        $query = "DELETE FROM $this->table WHERE id_reserva = :id_reserva";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_reserva", $id, PDO::PARAM_STR);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "DELETE", "Reserva"); 
        }
        return $executar;
    }

    public function aprovarReserva($id) {
        $query = "UPDATE $this->table SET status_reserva = :status_reserva WHERE id_reserva = :id_reserva";
        $stmt = $this->conn->prepare($query);
        $status = 'aprovada'; 
        $stmt->bindParam(':status_reserva', $status);
        $stmt->bindParam(':id_reserva', $id, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "APPROVE", "Reserva"); 
        }
        return $executar;
    }
    
    public function negarReserva($id) {
        $query = "UPDATE $this->table SET status_reserva = :status_reserva WHERE id_reserva = :id_reserva";
        $stmt = $this->conn->prepare($query);
        $status = 'negada'; 
        $stmt->bindParam(':status_reserva', $status);
        $stmt->bindParam(':id_reserva', $id, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "DENNY", "Reserva"); 
        }
        return $executar;
    }

    public function cancelarReserva($id) {
        $query = "UPDATE $this->table SET status_reserva = :status_reserva WHERE id_reserva = :id_reserva";
        $stmt = $this->conn->prepare($query);
        $status = 'cancelada'; 
        $stmt->bindParam(':status_reserva', $status);
        $stmt->bindParam(':id_reserva', $id, PDO::PARAM_INT);

        $executar = $stmt->execute();
        if ($executar) {
            $tokenUser = $this->helper->verificarTokenComPermissao();
            $this->log->registrar($tokenUser['id_usuario'], "DENNY", "Reserva"); 
        }
        return $executar;
    }
    

}
