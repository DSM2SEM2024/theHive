<?php
namespace App\Rotas;

use App\Controllers\LaboratorioController;
use App\Controllers\UsuarioController;
use App\Controllers\FormularioController;
use App\Controllers\ReservaController;
use App\Controllers\DisciplinaController;
use App\Controllers\CursoController;
use App\Controllers\SoftwareController; 

class rotas {
    public static function fastRotas(){
        return [
            'GET' => [
                //users
                '/users' => [UsuarioController::class, 'read'],
                '/users/{id}' => [UsuarioController::class, 'read'],
                //labs
                '/labs' => [LaboratorioController::class, 'read'],
                '/labs/{id}' => [LaboratorioController::class, 'read'],
                //forms
                '/forms' => [FormularioController::class, 'read'],
                '/forms/{id}' => [FormularioController::class, 'read'],
                //reserva
                '/reserve' => [ReservaController::class, 'obterTodasReservas'],
                '/reserve/{id}' => [ReservaController::class, 'obterReservaPorId'],
                '/reserve/data/{dataini}/{datafim}' => [ReservaController::class, 'obterReservaPorIntervaloDeData'],
                //disciplina
                '/disciplina' => [DisciplinaController::class, 'readAll'],
                '/disciplina/{id}' => [DisciplinaController::class, 'read'],
                //curso
                '/curso' => [CursoController::class, 'readAll'],
                '/curso/{id}' => [CursoController::class, 'read'],
                //software
                '/software' => [SoftwareController::class, 'read'], 
            ],
            'POST' => [
                //users
                '/users' => [UsuarioController::class, 'create'],
                '/login' => [UsuarioController::class, 'login'],
                //labs
                '/labs' => [LaboratorioController::class, 'create'],
                //forms
                '/forms' => [FormularioController::class, 'create'],
                //reserva
                '/reserve' => [ReservaController::class, 'criarReserva'],
                //disciplina
                '/disciplina' => [DisciplinaController::class, 'create'],
                //curso
                '/curso' => [CursoController::class, 'create'],
                //software
                '/software' => [SoftwareController::class, 'create'], 
            ],
            'PUT' => [
                //users
               '/users/{id}' => [UsuarioController::class, 'update'],
                //labs
                '/labs/{id}' => [LaboratorioController::class, 'update'],
                //forms
                '/forms{id}' => [FormularioController::class, 'update'],
                //reserva
                '/reserve/{id}' => [FormularioController::class, 'atualizarReserva'],
                //disciplina
                '/disciplina/{id}' => [DisciplinaController::class, 'update'],
                //curso
                '/curso/{id}' => [CursoController::class, 'update'],
                //software
                '/software' => [SoftwareController::class, 'update'], 
            ],
            'DELETE' => [
                '/users/{id}' => [UsuarioController::class, 'delete'],
                //labs
                '/labs/{id}' => [LaboratorioController::class, 'delete'],
                //forms
                '/forms' => [FormularioController::class, 'delete'],
                //reserva
                '/reserve/{id}' => [FormularioController::class, 'excluirReservaPorID'],
                //disciplina
                '/disciplina/{id}' => [DisciplinaController::class, 'delete'],
                //curso
                '/curso/{id}' => [CursoController::class, 'delete'],
                //software
                '/software' => [SoftwareController::class, 'delete'], 
            ],
        ];
    }
}

