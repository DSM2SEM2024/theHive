<?php
namespace App\Controllers;

use App\Model\Reserva;
use DateTime;
use DateInterval;
use DatePeriod;

class ReservaController {
    private $reserva;

    public function __construct() {
        $this->reserva = new Reserva();
    }

    //#[Router('/reserve', methods: ['GET'])]
    public function obterTodasReservas() {
        $ReservaAtual = $this->reserva->obterTodasReservas();
        http_response_code(200);
        echo json_encode($ReservaAtual);
    }

    //#[Router('/reserve/{id}', methods: ['GET'])]
    public function obterReservaPorId($id)
    {
        $ReservaAtual = $this->reserva->obterReservaPorId($id);
        if ($ReservaAtual) {
            http_response_code(200);
            echo json_encode($ReservaAtual);
        } else {
            http_response_code(404);
            echo json_encode(['status' => false, 'message' => 'Reserva não encontrada']);
        }
    }

    //#[Router('/reserve/data/{dataini}/{datafim}', methods: ['GET'])]
    public function obterReservaPorIntervaloDeData($dataini, $datafim)
    {
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $dataini) || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $datafim)) {
            http_response_code(400);
            echo json_encode(['status' => false, 'message' => 'Formato de data inválido']);
            return;
        }

        $ReservaAtual = $this->reserva->obterReservaPorIntervaloDeData($dataini, $datafim);
        if ($ReservaAtual) {
            http_response_code(200);
            echo json_encode($ReservaAtual);
        } else {
            http_response_code(404);
            echo json_encode(['status' => false, 'message' => 'Nenhuma reserva encontrada para o intervalo de datas especificado']);
        }
    }

    //#[Router('/reserve', methods: ['POST'])]
    public function criarReserva($data)
    {
        $numerox = $this->gerarStringAlfanumerica(8);

        if ($data->recorrencia === 'nenhuma') {
            $ReservaAtual = new Reserva();
            $ReservaAtual->setUsuarioId($data->usuarioId);
            $ReservaAtual->setLaboratorioId($data->labortorioId);
            $ReservaAtual->setDisciplinaId($data->disciplinaId);
            $ReservaAtual->setDataInicial($data->datainicial);
            $ReservaAtual->setDescricao($data->descricao);
            $ReservaAtual->setHorarioInicial($data->horarioinicial);
            $ReservaAtual->setHorarioFinal($data->horariofinal);
            $ReservaAtual->setRecorrencia($data->recorrencia);
            $ReservaAtual->setDescricao($data->descricao);
            $ReservaAtual->setDataCad($data->datacad);
            $ReservaAtual->setStatus($data->status);
            $ReservaAtual->setReservaId($numerox);

            $reservaCriada = $this->reserva->criarReserva($ReservaAtual);
        } else {
            $ReservaAtual = new Reserva();
            $ReservaAtual->setUsuarioId($data->usuarioId);
            $ReservaAtual->setLaboratorioId($data->labortorioId);
            $ReservaAtual->setDisciplinaId($data->disciplinaId);
            $ReservaAtual->setDataInicial($data->datainicial);
            $ReservaAtual->setDescricao($data->descricao);
            $ReservaAtual->setHorarioInicial($data->horarioinicial);
            $ReservaAtual->setHorarioFinal($data->horariofinal);
            $ReservaAtual->setRecorrencia($data->recorrencia);
            $ReservaAtual->setDescricao($data->descricao);
            $ReservaAtual->setDataCad($data->datacad);
            $ReservaAtual->setStatus($data->status);
            $ReservaAtual->setReservaId($numerox);

            $reservaCriada = $this->criarReservasRecorrentes($ReservaAtual, $numerox);
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

                if (!$this->reserva->criarReserva($reservaRecorrente)) {
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


    //#[Router('/reserve/{id}', methods: ['PUT'])]
    public function atualizarReserva($id, $data)
    {
        $reservaExistente = $this->reserva->obterReservaPorId($id);
        if ($reservaExistente) {
            $ReservaAtual = new Reserva();
            $ReservaAtual->setReservaId($id);
            $ReservaAtual->setUsuarioId($data->usuarioId ?? $reservaExistente['usuarioId']);
            $ReservaAtual->setLaboratorioId($data->labortorioId ?? $reservaExistente['labortorioId']);
            $ReservaAtual->setDisciplinaId($data->disciplinaId ?? $reservaExistente['disciplinaId']);
            $ReservaAtual->setDataInicial($data->datainicial ?? $reservaExistente['datainicial']);
            $ReservaAtual->setDataFinal($data->datafinal ?? $reservaExistente['datafinal']);
            $ReservaAtual->setHorarioInicial($data->horarioinicial  ?? $reservaExistente['horarioinicial']);
            $ReservaAtual->setHorarioFinal($data->horariofinal  ?? $reservaExistente['horariofinal']);
            $ReservaAtual->setRecorrencia($data->recorrencia ?? $reservaExistente['recorrencia']);
            $ReservaAtual->setDescricao($data->descricao ?? $reservaExistente['descricao']);
            $ReservaAtual->setDataCad($data->datacad ?? $reservaExistente['datacad']);
            $ReservaAtual->setStatus($data->status ?? $reservaExistente['status']);

            $reservaAtualizada = $this->reserva->atualizarReserva($ReservaAtual);
            if ($reservaAtualizada) {
                http_response_code(200);
                echo json_encode(['status' => true, 'mensagem' => 'Reserva atualizada com sucesso']);
            }
        } else {
            http_response_code(404);
            echo json_encode(['status' => false, 'mensagem' => 'Reserva não encontrada']);
        }
    }

    //#[Router('/reserve/forenkey/{id}', methods: ['DELETE'])]
    public function excluirReservaPorID($id)
    {
        $reservasExcluidos = $this->reserva->excluirReservaPorID($id);
        if ($reservasExcluidos) {
            http_response_code(200);
            echo json_encode(['status' => true, 'message' => 'Reserva(s) excluído(s) com sucesso.']);
        } else {
            http_response_code(404);
            echo json_encode(['status' => false, 'message' => 'Reserva não encontrada.']);
        }
    }
//
//
//criar funções novas que aprova e nega reservas. Muda o estado da reserva: -->
//
//


//#[Router('/reserve/{id}/approve', methods: ['PUT'])]
    public function aprovarReserva($id)
    {
        $reservaExistente = $this->reserva->obterReservaPorId($id);
        if ($reservaExistente) {
            $ReservaAtual = new Reserva();
            $ReservaAtual->setReservaId($id);
            $ReservaAtual->setStatus('aprovada'); 

        $reservaAtualizada = $this->reserva->atualizarReserva($ReservaAtual);
        if ($reservaAtualizada) {
            http_response_code(200);
            echo json_encode(['status' => true, 'mensagem' => 'Reserva aprovada com sucesso']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => false, 'mensagem' => 'Erro ao aprovar a reserva']);
        }
        } else {
            http_response_code(404);
            echo json_encode(['status' => false, 'mensagem' => 'Reserva não encontrada']);
        }
    }

//#[Router('/reserve/{id}/deny', methods: ['PUT'])]
    public function negarReserva($id)
{
        $reservaExistente = $this->reserva->obterReservaPorId($id);
        if ($reservaExistente) {
            $ReservaAtual = new Reserva();
            $ReservaAtual->setReservaId($id);
            $ReservaAtual->setStatus('negada'); 

        $reservaAtualizada = $this->reserva->atualizarReserva($ReservaAtual);
        if ($reservaAtualizada) {
            http_response_code(200);
            echo json_encode(['status' => true, 'mensagem' => 'Reserva negada com sucesso']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => false, 'mensagem' => 'Erro ao negar a reserva']);
        }
        } else {
            http_response_code(404);
            echo json_encode(['status' => false, 'mensagem' => 'Reserva não encontrada']);
        }
    }

}
