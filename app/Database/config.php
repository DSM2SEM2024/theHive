<?php
return [
    'database' => [
        'driver' => 'mysql', // 'pgsql', 'mysql', 'sqlite', 'sqlsrv' , 
        'mysql' => [
            'host' => 'localhost',
            'port' => '3306',
            'db_name' => 'reservas', 
            'username' => 'teste', 
            'password' => 'teste', 
            'charset' => 'utf8'
        ],
        'sqlite' => [
            'host' => 'localhost',
            'db_name' => 'a01_teste',
            'username' => 'root',
            'password' => 'root123',
            'charset' => 'utf8'
        ],
        'sqlsrv' => [
            'host' => 'localhost',
            'db_name' => 'a01_teste',
            'username' => 'root',
            'password' => 'root123',
            'charset' => 'utf8'
        ],
        'pgsql' => [
            'host' => 'localhost',
            'db_name' => 'postgres',
            'username' => 'root',
            'password' => 'root123',
            'port' => '5432', 
            'charset' => 'utf8'
        ],
        'mongodb' => [
            'host' => 'localhost',
            'db_name' => 'a01_teste_mongo',
            'username' => 'mongo_user',
            'password' => 'mongo_password',
            'port' => '27017', 
        ]
    ]

];
