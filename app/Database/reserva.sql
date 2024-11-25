/*CREATE USER 'teste'@'localhost' IDENTIFIED BY 'teste';
GRANT ALL PRIVILEGES ON reservas.* TO 'teste'@'localhost'; 
FLUSH PRIVILEGES;

create database reservas;
drop table reserva;
drop table laboratorio_equipamento;
drop table laboratorio;
drop table andar;
drop table equipamento_software;
drop table equipamento;
drop table software;
drop table disciplina;
drop table equipamento;
drop table curso;
drop table log;
drop table usuarios;*/

CREATE TABLE USUARIOS (
id_usuario int primary key auto_increment,
nome varchar(50) not null,
senha varchar(500) not null,
email varchar(50) not null,
perfil varchar(50) not null,
estado boolean not null default 1,
data_cad timestamp default current_timestamp
);

CREATE TABLE CURSO (
    id_curso INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL UNIQUE,
    estado BOOLEAN NOT NULL DEFAULT 1,
    data_cad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE DISCIPLINA (
    id_disciplina INT PRIMARY KEY AUTO_INCREMENT,
    id_curso INT,
    nome VARCHAR(50) NOT NULL,
    estado BOOLEAN NOT NULL DEFAULT 1,
    data_cad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_curso) REFERENCES CURSO(id_curso)
        ON DELETE SET NULL 
        ON UPDATE CASCADE
);

-- Trigger para desativar disciplinas ao desativar um curso
DELIMITER //

CREATE TRIGGER desativar_disciplinas_ao_desativar_curso
AFTER UPDATE ON CURSO
FOR EACH ROW
BEGIN
    IF NEW.estado = 0 THEN
        UPDATE DISCIPLINA SET estado = 0 WHERE id_curso = NEW.id_curso;
    END IF;
END//

DELIMITER ;

CREATE TABLE SOFTWARE (
	id_software int primary key auto_increment,
    nome varchar(50) not null,
    estado boolean not null default 1,
    data_cad timestamp default current_timestamp
);

CREATE TABLE EQUIPAMENTO (
	id_equipamento int primary key auto_increment,
    nome varchar(50) not null,
    numero int(3) not null,
    id_software int,
    estado boolean not null default 1,
    data_cad timestamp default current_timestamp,
    FOREIGN KEY (id_software) REFERENCES SOFTWARE(id_software)
);    

CREATE TABLE EQUIPAMENTO_SOFTWARE (
	id_equipamento_software int primary key auto_increment,
    id_software int,
	id_equipamento int,
	FOREIGN KEY (id_software) REFERENCES SOFTWARE(id_software),
    FOREIGN KEY (id_equipamento) REFERENCES EQUIPAMENTO(id_equipamento)
);

CREATE TABLE ANDAR (
	id_andar int primary key auto_increment,
    nome varchar(50) not null,
    cor varchar(50) not null,
	estado BOOLEAN NOT NULL DEFAULT 1,
    data_cad TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE LABORATORIO (
	id_laboratorio int primary key auto_increment,
    nome varchar(50) not null,
    andar int,
    equipamento int,
    capacidade int(2) not null,
    estado boolean not null default 1,
    data_cad timestamp default current_timestamp,
    FOREIGN KEY (equipamento) REFERENCES EQUIPAMENTO(id_equipamento),
    FOREIGN KEY (andar) REFERENCES ANDAR(id_andar)
    ON DELETE CASCADE -- Exclui laboratórios ao excluir o andar
);

CREATE TABLE LABORATORIO_EQUIPAMENTO(
	id_laboratorio_equipamento int primary key auto_increment,
    id_equipamento int,
    id_software int,
	FOREIGN KEY (id_equipamento) REFERENCES EQUIPAMENTO(id_equipamento),
    FOREIGN KEY (id_software) REFERENCES SOFTWARE(id_software)
);

CREATE TABLE RESERVA(
	id_reserva int primary key auto_increment,
    id_usuario int,
    id_laboratorio int,
    id_disciplina int,
    data_inicial date not null,
	data_final date not null,
	horario_inicial time not null,
	horario_final time not null,
	recorrencia varchar(50) not null,
	descricao varchar(100),
	data_cad timestamp default current_timestamp,
	status_reserva varchar(10) not null default 'pendente',
	FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id_usuario),
    FOREIGN KEY (id_laboratorio) REFERENCES LABORATORIO(id_laboratorio),
    FOREIGN KEY (id_disciplina) REFERENCES DISCIPLINA(id_disciplina)
);   

CREATE TABLE LOG (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    acao VARCHAR(50) NOT NULL,
    tabela  VARCHAR(50) NOT NULL,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id_usuario)
);
