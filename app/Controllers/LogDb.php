<?php 

namespace App\Controllers;
use App\Database\Database;

class LogDB {
    private $conn;

    public function __construct() {
        $this->conn = Database::getInstance();
    }

    public function log($action, $table, $user, $id = null) {
        $createTableIfnotExists = "CREATE table IF NOT EXISTS TLOGS(
            DATA_CORRENTE (datetime),
            LOGIN (varchar),
            EVENTO (varchar),
            PROPRIETARIO (varchar),
            NOME (varchar),
            TIPO (varchar))";

        $stmt = $this->conn->prepare($createTableIfnotExists);


        $query = "INSERT INTO TLOGS (DATA_CORRENTE, LOGIN, EVENTO, PROPRIETARIO, NOME, TIPO) 
                  VALUES (NOW(), ?, ?, DATABASE(), ?, ?)";

$stmt = $this->conn->prepare($query);
        $stmt->bind_param("sssss", $user, $action, $table, $table);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}