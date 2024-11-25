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
                '/reserve/profestado/{prof}/{estado}' => [ReservaController::class, 'obterReservaPorProfeEstado'],
                //disciplina
                '/disciplina' => [DisciplinaController::class, 'readAll'],
                '/disciplina/{id}' => [DisciplinaController::class, 'readId'],
                //curso
                '/curso' => [CursoController::class, 'readAll'],
                '/curso/{id}' => [CursoController::class, 'read'],
                //software
                '/software' => [SoftwareController::class, 'read'],
                //equipamento
                '/equipamento' => [EquipamentoController::class, 'read'],
                //logs
                '/logs' => [Log::class, 'read'],
                '/logs/prof/{prof}' => [Log::class, 'obterLogPorProf'],
            ],
            'POST' => [
                //usuario
                '/users' => [UsuarioController::class, 'create'],
                //usuario
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
                '/reserve/{id}/approve' => [ReservaController::class, 'aprovarReserva'],
                '/reserve/{id}/deny' => [ReservaController::class, 'negarReserva'],
                '/reserve/{id}/cancel' => [ReservaController::class, 'cancelarReserva'],
                //disciplina
                //disciplina
                '/disciplina/{id}' => [DisciplinaController::class, 'update'],
                //curso
                '/curso/{id}' => [CursoController::class, 'update'],
                //software
                '/software/{id}' => [SoftwareController::class, 'update'],
                //equipamento
                '/equipamento/{id}' => [EquipamentoController::class, 'update'],
                
                //desativar
                //users
                '/users/{id}/off' => [UsuarioController::class, 'desativar'],
                //andar
                '/andar/{id}/off' => [AndarController::class, 'desativar'],
                //labs
                '/labs/{id}/off' => [LaboratorioController::class, 'desativar'],
                //reserva
                '/reserve/{id}/off' => [ReservaController::class, 'desativar'],
                //disciplina
                '/disciplina/{id}/off' => [DisciplinaController::class, 'desativar'],
                //curso
                '/curso/{id}/off' => [CursoController::class, 'desativar'],
                //software
                '/software/{id}/off' => [SoftwareController::class, 'desativar'],
                //equipamento
                '/equipamento/{id}/off' => [EquipamentoController::class, 'desativar'],

                //ativar
                //users
                '/users/{id}/on' => [UsuarioController::class, 'ativar'],
                //andar
                '/andar/{id}/on' => [AndarController::class, 'ativar'],
                //labs
                '/labs/{id}/on' => [LaboratorioController::class, 'ativar'],
                //reserva
                '/reserve/{id}/on' => [ReservaController::class, 'ativar'],
                //disciplina
                '/disciplina/{id}/on' => [DisciplinaController::class, 'ativar'],
                //curso
                '/curso/{id}/on' => [CursoController::class, 'ativar'],
                //software
                '/software/{id}/on' => [SoftwareController::class, 'ativar'],
                //equipamento
                '/equipamento/{id}/on' => [EquipamentoController::class, 'ativar'],
                //Alterar senha (popup)
                //'/users/{id}/senha' => [UsuarioController::class, 'alterarSenha']
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