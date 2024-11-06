<?php
namespace App\EventoFaustino;

use app\Database\Database;
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

    public function __construct() {
        $this->conn = Database::getInstance();
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

}
