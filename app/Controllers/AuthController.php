<?php
/*
namespace App\Controllers;
use App\Model\Usuario; 
use App\utils;
use App\Views\Admin;
use App\Views\AdminMaster;
use App\Views\Professor;
use App\Database\Database;
use PDO;
*/

/*
class AuthController {
    private $user;
    private $conn;

    public function __construct() {
        $this->user = new Usuario(); //1 - classe usuario - ok
        $this->conn = Database::getInstance();
    }
*/
/*
    public function auth($data) {
    $nome = $data->nome; // 5??
    $senha = $_POST['senha'];

    $query = "SELECT * FROM USUARIOS WHERE nome = :nome"; //4 - bando de dados - quase ok
    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(":nome", $this->user.nome, PDO::PARAM_STR);
    return $stmt->execute();

    if ($user && password_verify($senha, $user['senha'])) {
        $_SESSION['idUsuario'] = $user['id']; //2 - session_start() - ok
        $_SESSION['perfil'] = $user['perfil'];
        
        if ($user['perfil'] == 'Admin') {
            header("Location: Admin.php"); //3 - admin, master e prof - ok
        } elseif ($user['perfil'] == 'AdminMaster') {
            header("Location: AdminMaster.php");
        } elseif ($user['perfil'] == 'Professor') {
            header("Location: Professor.php");
        }
        exit();
    } else {
        echo "Nome de usuário ou senha incorretos";
    }
    }    
}
*/