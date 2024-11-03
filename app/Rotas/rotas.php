<?php
namespace App\Rotas;

use App\Controllers\LaboratorioController;
use App\Controllers\UsuarioController;
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
                //formulario
                '/formulario' => [FormularioController::class, 'read'],
                '/formulario/{id}' => [FormularioController::class, 'read']
            ],
            'POST' => [
                //users
                '/users' => [UsuarioController::class, 'create'],
                '/login' => [UsuarioController::class, 'login'],
                //labs
                '/labs' => [LaboratorioController::class, 'create'],
                //formulario
                '/formulario' => [FormularioController::class, 'create']

            ],
            'PUT' => [
                //users
               '/users/{id}' => [UsuarioController::class, 'update'],
                //labs
                '/labs/{id}' => [LaboratorioController::class, 'update'],
                //formulario
                '/formulario' => [FormularioController::class, 'update']
            ],
            'DELETE' => [
                '/users/{id}' => [UsuarioController::class, 'delete'],
                //labs
                '/labs/{id}' => [LaboratorioController::class, 'delete'],
                //formulario
                '/formulario' => [FormularioController::class, 'delete']

            ],
        ];
    }
}

