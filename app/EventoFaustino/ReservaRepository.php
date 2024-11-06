<?php
namespace app\EventoFaustino;

use app\Database\Database;
use app\EventoFaustino\Reserva;
use PDO;

class ReservaRepository {
    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance();
        $this->criarTabelaSeNaoExistir();
    }

    private function criarTabelaSeNaoExistir() {
        $query = "
            CREATE TABLE RESERVA(
                id_reserva int primary key,
                id_usuario int,
                id_laboratorio int,
                id_disciplina int,
                data_inicial date not null,
                data_final date not null,
                horario_inicial time not null,
                horario_final time not null,
                recorrencia varchar(50) not null,
                descricao varchar(100),
                data_cad datetime not null ,
                status_reserva varchar(10),
                FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario),
                FOREIGN KEY (id_laboratorio) REFERENCES LABORATORIO(id_laboratorio),
                FOREIGN KEY (id_disciplina) REFERENCES DISCIPLINA(id_disciplina)
            );
        ";
        $this->conn->exec($query);
    }

    public function obterTodasReservas() {
        $query = "SELECT * FROM Reserva";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function criarReserva(Reserva $reserva) {
        $query = "INSERT INTO eventos (id_reserva, id_usuario, id_laboratorio, id_disciplina, data_inicial, data_final, horario_inicial, horario_final, recorrencia, descricao, data_cad, status_reserva)
                  VALUES (:id_reserva, :id_usuario, :id_laboratorio, :id_disciplina, :data_inicial, :data_final, :horario_inicial, :horario_final, :recorrencia, :descricao, :data_cad, :status_reserva)";
        $stmt = $this->conn->prepare($query);
    
        $idReserva = $reserva->getReservaId();
        $idUsuario = $reserva->getUsuarioId();
        $idLaboratorio = $reserva->getLaboratorioId();
        $idDisciplina = $reserva->getDisciplinaId();
        $dataInicial = $reserva->getDataInicial();
        $dataFinal = $reserva->getDataFinal();
        $horarioInicial = $reserva->getHorarioInicial();
        $horarioFinal = $reserva->getHorarioFinal();
        $recorrencia = $reserva->getRecorrencia();
        $descricao = $reserva->getDescricao();
        $dataCad = $reserva->getDataCad();
        $status = $reserva->getStatus();
    
        $stmt->bindParam(":id_reserva", $idReserva);
        $stmt->bindParam(":id_usuario", $idUsuario);
        $stmt->bindParam(":id_laboratorio", $idLaboratorio);
        $stmt->bindParam(":id_disciplina", $idDisciplina);
        $stmt->bindParam(":data_inicial", $dataInicial);
        $stmt->bindParam(":data_final", $dataFinal);
        $stmt->bindParam(":horario_inicial", $horarioInicial);
        $stmt->bindParam(":horario_final", $horarioFinal);
        $stmt->bindParam(":recorrencia", $recorrencia);
        $stmt->bindParam(":descricao", $descricao);
        $stmt->bindParam(":data_cad", $dataCad);
        $stmt->bindParam(":status_reserva", $status);
    
        /*
reserva
idReserva
idusuario
idlaboratorio
iddisciplina
data inicial
data final
hora inicial
hora final
recorrencia
descricao
datacad
status
    */

        return $stmt->execute();
    }
    

    public function obterReservaPorId($id) {
        $query = "SELECT * FROM eventos WHERE id_reserva = :id_reserva";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_reserva", $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function atualizarReserva(Reserva $Reserva) {
        $query = "UPDATE Reserva SET  id_usuario = :id_usuario, id_laboratorio = :id_laboratorio, id_disciplina = :id_disciplina, data_inicial = :data_inicial, data_final = :data_final, horario_inicial = :horario_inicial, horario_final = :horario_final, recorrencia = :recorrencia, descricao = :descricao, data_cad = :data_cad, status_reserva = :status_reserva WHERE id_reserva = :id_reserva";
        $stmt = $this->conn->prepare($query);

        $idReserva = $Reserva->getReservaId();
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
        $stmt->bindParam(":data_cad", $dataCad);
        $stmt->bindParam(":status_reserva", $status);
        $stmt->bindParam(":id_reserva", $idReserva, PDO::PARAM_INT);
        
        return $stmt->execute();
    }

    public function obterReservaPorIntervaloDeData($dataini, $datafim) {
        $query = "SELECT * FROM Reserva WHERE data_inicial >= :data_inicial AND data_final <= :data_final";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":data_inicial", $dataini);
        $stmt->bindParam(":data_final", $datafim);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function excluirReservaPorID($id,) {
        $query = "DELETE FROM Reserva WHERE id_reserva = :id_reserva";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id_reserva", $id, PDO::PARAM_STR);
        return $stmt->execute();
    }

}
