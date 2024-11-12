<?php

namespace App\Database;

use App\Database\Database;
use PDO;

class Triggers
{
    
    private $conn;
    private $table; 

    public function __construct() {
        $this->conn = Database::getInstance();
    }

    public function updateLaboratorio($trigger) {
        $nome = $laboratorio->getNome();
        $andar = $laboratorio->getAndar();
        $equipamento = $laboratorio->getEquipamento();
        $capacidade = $laboratorio->getCapacidade();
        $query =
         "INSERT INTO $this->table (nome, andar, equipamento, capacidade)
         VALUES (:nome, :andar, :equipamento, :capacidade)";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":nome", $nome);
        $stmt->bindParam(":andar", $andar);
        $stmt->bindParam(":equipamento", $equipamento);
        $stmt->bindParam(":capacidade", $capacidade);

        return $stmt->execute();
    }

    public function trigger() {
        $createTableIfnotExists = "CREATE table IF NOT EXISTS TLOGS(
        DATA_CORRENTE (datetime),
        LOGIN (varchar),
        EVENTO (varchar),
        PROPRIETARIO (varchar),
        NOME (varchar),
        TIPO (varchar))";

        $trigger = "CREATE TRIGGER logCreate
        AFTER CREATE TABLE, ALTER TABLE, TRUNCATE TABLE, INSERT, DELETE, UPDATE, DROP, DROP TABLE ON DATABASE
        FOR EACH ROW
         BEGIN
             DECLARE luser VARCHAR(30);
             DECLARE leven VARCHAR(20);
             DECLARE lowner VARCHAR(30);
             DECLARE ltype VARCHAR(20);
             DECLARE lname VARCHAR(30);
             SET luser = CURRENT_USER();
             SET leven = 'CREATE TABLE';

             IF leven <> 'INSERT' THEN
                 SET ltype = 'TABLE';
                 SET lowner = DATABASE();
                 SET lname = TABLE_NAME;
        
                 INSERT INTO TLOGS (DATA_CORRENTE, LOGIN, EVENTO, PROPRIETARIO, NOME, TIPO)
                 VALUES (NOW(), luser, leven, lowner, lname, ltype);
             ELSE
                 INSERT INTO TLOGS (DATA_CORRENTE, LOGIN, EVENTO)
                 VALUES (NOW(), luser, leven);
             END IF;
         END//";
    }



}