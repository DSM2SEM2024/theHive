<?php
namespace App\Controllers;

use App\Model\Usuario;
use App\utils;
use App\Views;
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;
use App\utils\AuthHelpers;

class UsuarioController {
    private $user;
    private $helper;
    private $jwtSecret = 'chave123';

    public function __construct() {
        $this->user = new Usuario();
        $this->helper = new AuthHelpers();
    }

    public function login($data) {
        header('Content-Type: application/json');
        if (!isset($data->email, $data->senha)) {
            http_response_code(400);
            echo json_encode(["error" => "Email e senha são necessários para o login."]);
            return;
        }
    
        $usuario = $this->user->getUsuarioByEmail($data->email);
        if ($usuario && password_verify($data->senha, $usuario['senha'])) {
            unset($usuario['senha']);
            $payload = [
                "id_usuario" => $usuario['id_usuario'],
                "nome" => $usuario['nome'],
                "email" => $usuario['email'],
                "perfil" => $usuario['perfil'],
                "iat" => time(),
                "exp" => time() + 3600000
            ];

            $token = JWT::encode($payload, $this->jwtSecret, 'HS256');
            
            http_response_code(200);
            echo json_encode(["message" => "Login bem-sucedido.",
            "token" => $token,
            "userId" => $usuario['id_usuario'],
            //"primeiro_login" => $usuario['primeiro_login'] // Adicionado aqui
            ]);
            
            exit();
        } else {
            http_response_code(401);
            echo json_encode(["error" => "Email ou senha inválidos."]);
        }
    }
    //      // Função de alteração de senha
    // public function alterarSenha($id, $data) {
    //     // Passo 1: Verificar se os dados necessários foram fornecidos
    //     if (!isset($data->novaSenha)) {
    //         http_response_code(400);
    //         echo json_encode(["error" => "Dados incompletos."]);
    //         return;
    //     }

    //     $novaSenhaHash = ($data->novaSenha);
    //     $this->user->setSenha($novaSenhaHash);
        
    //     // Passo 3: Atualizar a senha no banco de dados
    //     if ($this->user->updateSenha($id, $novaSenhaHash)) {
    //         http_response_code(200);
    //         echo json_encode(["message" => "Senha alterada com sucesso."]);
    //     } else {
    //         http_response_code(500);
    //         echo json_encode(["error" => "Erro ao alterar a senha."]);
    //     }
    // }

    public function create($data) {
        //$this->helper->criar();
        if (!isset($data->nome, $data->email, $data->senha, $data->perfil)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para a criação do usuário."]);
            return;
        }
        $usuarioExistente = $this->user->getUsuarioByEmail($data->email);
        if ($usuarioExistente) {
            http_response_code(409);
            echo json_encode(["error" => "Um usuário com esse e-mail já existe."]);
            return;
        }

        $this->user->setNome($data->nome)->setEmail($data->email)->setSenha($data->senha)->setPerfil($data->perfil);
        if ($this->user->insertUsuario($this->user)) {
            http_response_code(201);
            echo json_encode(["success"=> true,"message" => "Usuário criado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao criar usuário."]);
        }
    }
    
    public function read($id = null) {
        $this->helper->visualizar();
        if ($id) {
            $result = $this->user->getUsuarioById($id);
            if($result){
                unset($result['senha']);
                $status = 200 ;
            }else{
                $status = 404;
            }  
        } else {
            $result = $this->user->getAllUsuarios();
            foreach ($result as &$usuario) {
                unset($usuario['senha']);
            }
            unset($usuario);
            $status = !empty($result) ? 200 : 404;
        }

        http_response_code($status);
        echo json_encode($result ?: ["message" => "Nenhum usuário encontrado."]);
    }

    public function filterByNome($nomeUsuario) {
        $nomeUsuario = urldecode($nomeUsuario);
        $nomeUsuario = $this->prepareLikeParameter($nomeUsuario);
        $this->helper->visualizar();
        $result = $this->user->getUsuarioByName($nomeUsuario);
        if ($result) {
            http_response_code(200);
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Nenhum usuário encontrado com o nome: $nomeUsuario"]);
        }
    }

    private function prepareLikeParameter($param) {
        return '%' . trim($param) . '%';
    }

    public function update($id, $data) {
        $this->helper->atualizar();
        if (!isset($data->nome, $data->email, $data->perfil)) {
            http_response_code(400);
            echo json_encode(["error" => "Dados incompletos para atualização do usuário."]);
            return;
        }

        $this->user->setNome($data->nome)->setEmail($data->email)->setSenha($data->senha)->setPerfil($data->perfil);

        if ($this->user->updateUsuario($id)) {
            http_response_code(200);
            echo json_encode(["message" => "Usuário atualizado com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao atualizar usuário."]);
        }
    }

    public function desativar($id)
    {
        $this->helper->desativar();
        $usuarioExistente = $this->user->getUsuarioById($id);
        if ($usuarioExistente) {
        $func = $this->user->desativar($id);
        if ($func) {
            http_response_code(200);
            echo json_encode(['status' => true, 'mensagem' => 'Removido com sucesso.']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => false, 'mensagem' => 'Erro ao remover.']);
        }
        } else {
            http_response_code(404);
            echo json_encode(['status' => false, 'mensagem' => 'Não encontrado.']);
        }
    }  

    public function ativar($id)
    {
        $this->helper->ativar();
        $usuarioExistente = $this->user->getUsuarioById($id);
        if ($usuarioExistente) {
        $func = $this->user->ativar($id);
        if ($func) {
            http_response_code(200);
            echo json_encode(['status' => true, 'mensagem' => 'Ativo com sucesso.']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => false, 'mensagem' => 'Erro ao ativar.']);
        }
        } else {
            http_response_code(404);
            echo json_encode(['status' => false, 'mensagem' => 'Não encontrado.']);
        }
    }

    public function delete($id) {
        $this->helper->deletar();
        if ($this->user->deleteUsuario($id)) {
            http_response_code(200);
            echo json_encode(["message" => "Usuário excluído com sucesso."]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Erro ao excluir usuário."]);
        }
    }
}
