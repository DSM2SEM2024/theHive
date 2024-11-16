<?php
namespace App\Rotas;

use App\Controllers\LaboratorioController;
use App\Controllers\UsuarioController;
use App\Controllers\FormularioController;
use App\Controllers\ReservaController;
use App\Controllers\DisciplinaController;
use App\Controllers\CursoController;
use App\Controllers\SoftwareController; 
use App\Controllers\EquipamentoController;
use App\Controllers\AndarController;
use App\Model\Log;

class rotas {
    public static function fastRotas(){
        return [
            'GET' => [
                //users
                '/users' => [UsuarioController::class, 'read'],
                '/users/{id}' => [UsuarioController::class, 'read'],
                '/users/nome/{nomeUsuario}' => [UsuarioController::class, 'filterByNome'],
                //andar
                '/andar' => [AndarController::class, 'readAll'],
                '/andar/{id}' => [AndarController::class, 'readId'],
                //labs
                '/labs' => [LaboratorioController::class, 'read'],
                '/labs/{id}' => [LaboratorioController::class, 'read'],
                '/labs/nome/{nomeLaboratorio}' => [LaboratorioController::class, 'filterByNome'],
                '/labs/andar/{andar}' => [LaboratorioController::class, 'filterLaboratorioByAndar'],
                //reserva
                '/reserve' => [ReservaController::class, 'obterTodasReservas'],
                '/reserve/{id}' => [ReservaController::class, 'obterReservaPorId'],
                '/reserve/data/{dataini}/{datafim}' => [ReservaController::class, 'obterReservaPorIntervaloDeData'],
                '/reserve/estado/{estado}' => [ReservaController::class, 'obterReservaPorEstado'],
                '/reserve/lab/{lab}' => [ReservaController::class, 'obterReservaPorLab'],
                '/reserve/prof/{prof}' => [ReservaController::class, 'obterReservaPorProf'],
                //disciplina
                '/disciplina' => [DisciplinaController::class, 'readAll'],
                '/disciplina/{id}' => [DisciplinaController::class, 'readId'],
                //curso
                '/curso' => [CursoController::class, 'readAll'],
                '/curso/{id}' => [CursoController::class, 'read'],
                //software
                '/software' => [SoftwareController::class, 'read'],
                '/software/{id}' => [SoftwareController::class, 'read'],
                //equipamento
                '/equipamento' => [EquipamentoController::class, 'read'],
                '/equipamento/{id}' => [EquipamentoController::class, 'read'],
                //logs
                '/logs' => [Log::class, 'read'],
                '/logs/prof/{prof}' => [Log::class, 'obterLogPorProf'],
            ],
            'POST' => [
                //usuario
                '/users' => [UsuarioController::class, 'create'],
                '/login' => [UsuarioController::class, 'login'],
                //andar
                '/andar' => [AndarController::class, 'create'],
                //labs
                '/labs' => [LaboratorioController::class, 'create'],
                //reserva
                '/reserve' => [ReservaController::class, 'criarReserva'],
                //disciplina
                '/disciplina' => [DisciplinaController::class, 'create'],
                //curso
                '/curso' => [CursoController::class, 'create'],
                //software
                '/software' => [SoftwareController::class, 'create'],
                //equipamento
                '/equipamento' => [EquipamentoController::class, 'create'], 
            ],
            'PUT' => [
                //users
                '/users/{id}' => [UsuarioController::class, 'update'],
                //andar
                '/andar/{id}' => [AndarController::class, 'update'],
                //labs
                '/labs/{id}' => [LaboratorioController::class, 'update'],
                //reserva
                '/reserve/{id}' => [ReservaController::class, 'atualizarReserva'],
                //disciplina
                '/disciplina/{id}' => [DisciplinaController::class, 'update'],
                //curso
                '/curso/{id}' => [CursoController::class, 'update'],
                //software
                '/software/{id}' => [SoftwareController::class, 'update'],
                //equipamento
                '/equipamento/{id}' => [EquipamentoController::class, 'update'],
            ],
            'DELETE' => [
                //users
                '/users/{id}' => [UsuarioController::class, 'delete'],
                //andar
                '/andar/{id}' => [AndarController::class, 'delete'],
                //labs
                '/labs/{id}' => [LaboratorioController::class, 'delete'],
                //reserva
                '/reserve/{id}' => [ReservaController::class, 'excluirReservaPorID'],
                //disciplina
                '/disciplina/{id}' => [DisciplinaController::class, 'delete'],
                //curso
                '/curso/{id}' => [CursoController::class, 'delete'],
                //software
                '/software/{id}' => [SoftwareController::class, 'delete'], 
                //equipamento
                '/equipamento/{id}' => [EquipamentoController::class, 'delete'],
            ],
        ];
    }
}