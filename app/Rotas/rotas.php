<?php
namespace App\Rotas;

use App\Controllers\LaboratorioController;
use App\Controllers\UsuarioController;
use App\Controllers\FormularioController;
use App\Controllers\ReservaController;

class Rotas {
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
                '/reserve' => [ReservaController::class, 'read'],
                '/reserve/{id}' => [ReservaController::class, 'read'],
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
                '/reserve' => [ReservaController::class, 'create'],
            ],
            'PUT' => [
                //users
               '/users/{id}' => [UsuarioController::class, 'update'],
                //labs
                '/labs/{id}' => [LaboratorioController::class, 'update'],
                //forms
                '/forms' => [FormularioController::class, 'update'],
                //reserva
                '/reserve' => [FormularioController::class, 'update'],
                
            ],
            'DELETE' => [
                '/users/{id}' => [UsuarioController::class, 'delete'],
                //labs
                '/labs/{id}' => [LaboratorioController::class, 'delete'],
                //forms
                '/forms' => [FormularioController::class, 'delete'],
                //reserva
                '/reserve' => [FormularioController::class, 'delete'],
            ],
        ];
    }
}

