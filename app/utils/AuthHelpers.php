<?php

namespace App\utils;

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

class AuthHelpers {

    public function getAuthorizationHeader() {
        $headers = null;
        if (isset($_SERVER['Authorization'])) {
            $headers = trim($_SERVER["Authorization"]);
        } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
            }
        }
        return $headers;
    }

    public function verificarTokenComPermissao() {
        $jwtSecret = 'chave123';

        $authHeader = getallheaders();
        
        if (!$authHeader) {
            http_response_code(401);
            echo json_encode(["error" => "Token de autorização não fornecido."]);
            exit();
        }

        $token = str_replace('Bearer ', '', $authHeader['Authorization']);
        
        try {
            $usuario = (array) JWT::decode($token, new Key($jwtSecret, 'HS256'));
            return $usuario;
        } catch (\Exception $e) {
            http_response_code(401);
            echo json_encode(["error" => "Token inválido ou expirado."]);
            exit();
        }
    }

    //PERMISSÕES EM USUÁRIOS

    public function criar(){
        $usuario = $this->verificarTokenComPermissao();
        if ($usuario['perfil'] !== 'Admin' && $usuario['perfil'] !== 'AdminMaster') {
            http_response_code(403);
            echo json_encode(["error" => "Você não tem permissão para essa ação."]);
            exit();
        }

        return $usuario;
        
    }

    public function visualizar(){ 
        $usuario = $this->verificarTokenComPermissao();
        if ($usuario['perfil'] !== 'Professor' && $usuario['perfil'] !== 'Admin' && $usuario['perfil'] !== 'AdminMaster') {
            http_response_code(403);
            echo json_encode(["error" => "Você não tem permissão para essa ação."]);
            exit();
        }

        return $usuario;
        
    }

    public function visualizarInativos(){ 
        $usuario = $this->verificarTokenComPermissao();
        if ($usuario['perfil'] !== 'AdminMaster') {
            http_response_code(403);
            echo json_encode(["error" => "Você não tem permissão para essa ação."]);
            exit();
        }

        return $usuario;
        
    }

    public function atualizar(){ 
        $usuario = $this->verificarTokenComPermissao();
        if ($usuario['perfil'] !== 'Admin' && $usuario['perfil'] !== 'AdminMaster') {
            http_response_code(403);
            echo json_encode(["error" => "Você não tem permissão para essa ação."]);
            exit();
        }

        return $usuario;
        
    }

    public function desativar(){ 
        $usuario = $this->verificarTokenComPermissao();
        if ($usuario['perfil'] !== 'Admin' && $usuario['perfil'] !== 'AdminMaster') {
            http_response_code(403);
            echo json_encode(["error" => "Você não tem permissão para essa ação."]);
            exit();
        }

        return $usuario;
        
    }

    public function ativar(){ 
        $usuario = $this->verificarTokenComPermissao();
        if ($usuario['perfil'] !== 'AdminMaster' ) {
            http_response_code(403);
            echo json_encode(["error" => "Você não tem permissão para essa ação."]);
            exit();
        }

        return $usuario;
        
    }

    public function deletar(){ 
        $usuario = $this->verificarTokenComPermissao();
        if ($usuario['perfil'] !== 'AdminMaster' ) {
            http_response_code(403);
            echo json_encode(["error" => "Você não tem permissão para essa ação."]);
            exit();
        }

        return $usuario;
        
    }
}