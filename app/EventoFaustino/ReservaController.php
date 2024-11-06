<?php

namespace app\EventoFaustino;

use app\Database\Database;
use app\EventoFaustino\Reserva;
use app\EventoFaustino\ReservaRepository;
use app\Rotas\Router;
use DateTime;
use DateInterval;
use DatePeriod;

class ReservaController
{
    private $reservaRepository;
    private $conn;

    public function __construct()
    {
        $this->reservaRepository = new ReservaRepository();
    }

    private function criarTabelaSeNaoExistir()
    {
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

    #[Router('/reserve', methods: ['GET'])]
    public function obterTodasReservas()
    {
        $Reserva = $this->reservaRepository->obterTodasReservas();
        http_response_code(200);
        echo json_encode($Reserva);
    }

    #[Router('/reserve/{id}', methods: ['GET'])]
    public function obterReservaPorId($id)
    {
        $reserva = $this->reservaRepository->obterReservaPorId($id);
        if ($reserva) {
            http_response_code(200);
            echo json_encode($reserva);
        } else {
            http_response_code(404);
            echo json_encode(['status' => false, 'message' => 'Reserva não encontrada']);
        }
    }

    #[Router('/reserve/data/{dataini}/{datafim}', methods: ['GET'])]
    public function obterReservaPorIntervaloDeData($dataini, $datafim)
    {
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $dataini) || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $datafim)) {
            http_response_code(400);
            echo json_encode(['status' => false, 'message' => 'Formato de data inválido']);
            return;
        }

        $reserva = $this->reservaRepository->obterReservaPorIntervaloDeData($dataini, $datafim);
        if ($reserva) {
            http_response_code(200);
            echo json_encode($reserva);
        } else {
            http_response_code(404);
            echo json_encode(['status' => false, 'message' => 'Nenhuma reserva encontrada para o intervalo de datas especificado']);
        }
    }

    #[Router('/reserve', methods: ['POST'])]
    public function criarReserva($data)
    {
        $numerox = $this->gerarStringAlfanumerica(8);

        if ($data->recorrencia === 'nenhuma') {
            $reserva = new Reserva();
            $reserva->setUsuarioId($data->usuarioId);
            $reserva->setLaboratorioId($data->labortorioId);
            $reserva->setDisciplinaId($data->disciplinaId);
            $reserva->setDataInicial($data->datainicial);
            $reserva->setDescricao($data->descricao);
            $reserva->setHorarioInicial($data->horarioinicial);
            $reserva->setHorarioFinal($data->horariofinal);
            $reserva->setRecorrencia($data->recorrencia);
            $reserva->setDescricao($data->descricao);
            $reserva->setDataCad($data->datacad);
            $reserva->setStatus($data->status);
            $reserva->setReservaId($numerox);

            $reservaCriada = $this->reservaRepository->criarReserva($reserva);
        } else {
            $reserva = new Reserva();
            $reserva->setUsuarioId($data->usuarioId);
            $reserva->setLaboratorioId($data->labortorioId);
            $reserva->setDisciplinaId($data->disciplinaId);
            $reserva->setDataInicial($data->datainicial);
            $reserva->setDescricao($data->descricao);
            $reserva->setHorarioInicial($data->horarioinicial);
            $reserva->setHorarioFinal($data->horariofinal);
            $reserva->setRecorrencia($data->recorrencia);
            $reserva->setDescricao($data->descricao);
            $reserva->setDataCad($data->datacad);
            $reserva->setStatus($data->status);
            $reserva->setReservaId($numerox);

            $reservaCriada = $this->criarReservasRecorrentes($reserva, $numerox);
        }

        http_response_code(201);
        echo json_encode(['status' => $reservaCriada]);
    }

    private function criarReservasRecorrentes(Reserva $reserva, $reservaId)
    {
        $recorrencia = $reserva->getRecorrencia();
        $dataInicial = new DateTime($reserva->getDataInicial());
        $dataFinalOriginal = new DateTime($reservaId->getDataFinal());

        $intervalo = match ($recorrencia) {
            'diaria' => new DateInterval('P1D'),
            'semanal' => new DateInterval('P1W'),
            'mensal' => new DateInterval('P1M'),
            default => null,
        };

        if ($intervalo) {
            $periodo = new DatePeriod($dataInicial, $intervalo, $dataFinalOriginal);

            foreach ($periodo as $dataRecorrente) {
                if ($recorrencia === 'semanal' && $dataRecorrente->format('N') !== $dataInicial->format('N')) {
                    continue;
                }

                $reservaRecorrente = clone $reserva;
                $dataRecorrenteFormatada = $dataRecorrente->format('Y-m-d');
                $reservaRecorrente->setDataInicial($dataRecorrenteFormatada);
                $reservaRecorrente->setDataFinal($dataRecorrenteFormatada);
                $reservaRecorrente->setReservaId($reservaId);

                if (!$this->reservaRepository->criarReserva($reservaRecorrente)) {
                    return false;
                }
            }
            return true;
        }

        return false;
    }


    public function gerarStringAlfanumerica($tamanho)
    {
        $caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $stringAleatoria = '';
        for ($i = 0; $i < $tamanho; $i++) {
            $index = rand(0, strlen($caracteres) - 1);
            $stringAleatoria .= $caracteres[$index];
        }
        return $stringAleatoria;
    }


    #[Router('/reserve/{id}', methods: ['PUT'])]
    public function atualizarReserva($id, $data)
    {
        $reservaExistente = $this->reservaRepository->obterReservaPorId($id);
        if ($reservaExistente) {
            $reserva = new Reserva();
            $reserva->setReservaId($id);
            $reserva->setUsuarioId($data->usuarioId ?? $reservaExistente['usuarioId']);
            $reserva->setLaboratorioId($data->labortorioId ?? $reservaExistente['labortorioId']);
            $reserva->setDisciplinaId($data->disciplinaId ?? $reservaExistente['disciplinaId']);
            $reserva->setDataInicial($data->datainicial ?? $reservaExistente['datainicial']);
            $reserva->setDataFinal($data->datafinal ?? $reservaExistente['datafinal']);
            $reserva->setHorarioInicial($data->horarioinicial  ?? $reservaExistente['horarioinicial']);
            $reserva->setHorarioFinal($data->horariofinal  ?? $reservaExistente['horariofinal']);
            $reserva->setRecorrencia($data->recorrencia ?? $reservaExistente['recorrencia']);
            $reserva->setDescricao($data->descricao ?? $reservaExistente['descricao']);
            $reserva->setDataCad($data->datacad ?? $reservaExistente['datacad']);
            $reserva->setStatus($data->status ?? $reservaExistente['status']);

            $reservaAtualizada = $this->reservaRepository->atualizarReserva($reserva);
            if ($reservaAtualizada) {
                http_response_code(200);
                echo json_encode(['status' => true, 'mensagem' => 'Reserva atualizada com sucesso']);
            }
        } else {
            http_response_code(404);
            echo json_encode(['status' => false, 'mensagem' => 'Reserva não encontrada']);
        }
    }

    #[Router('/reserve/forenkey/{id}', methods: ['DELETE'])]
    public function excluirReservaPorID($id)
    {
        $reservasExcluidos = $this->reservaRepository->excluirReservaPorID($id);
        if ($reservasExcluidos) {
            http_response_code(200);
            echo json_encode(['status' => true, 'message' => 'Reserva(s) excluído(s) com sucesso.']);
        } else {
            http_response_code(404);
            echo json_encode(['status' => false, 'message' => 'Reserva não encontrada.']);
        }
    }
}

//criar funções novas que aprova e nega reservas. Muda o estado da reserva.
