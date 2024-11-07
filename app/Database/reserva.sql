/*CREATE USER 'teste'@'127.0.0.1' IDENTIFIED BY 'teste';
GRANT ALL PRIVILEGES ON reserva.* TO 'teste'@'127.0.0.1'; 
FLUSH PRIVILEGES;

drop table reserva;
drop table laboratorio;
drop table equipamento_software;
drop table software;
drop table equipamento;
drop table disciplina;
drop table curso;
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
	id_curso int primary key auto_increment,
    nome varchar(50) not null,
    estado boolean not null default 1,
    data_cad timestamp default current_timestamp
);

CREATE TABLE DISCIPLINA (
	id_disciplina int primary key auto_increment,
    id_curso int,
    nome varchar(50) not null,
    estado boolean not null default 1,
    data_cad timestamp default current_timestamp,
    FOREIGN KEY (id_curso) REFERENCES CURSO(id_curso)
);

CREATE TABLE EQUIPAMENTO (
	id_equipamento int primary key auto_increment,
    nome varchar(50) not null,
    numero int(3) not null,
    sofware varchar(50) not null,
    estado boolean not null default 1,
    data_cad timestamp default current_timestamp
);    

CREATE TABLE SOFTWARE (
	id_software int primary key auto_increment,
    nome varchar(50) not null,
    estado boolean not null default 1,
    data_cad timestamp default current_timestamp
);


CREATE TABLE EQUIPAMENTO_SOFTWARE (
	id_equipamento_software int primary key auto_increment,
    id_software int,
	id_equipamento int,
	FOREIGN KEY (id_software) REFERENCES SOFTWARE(id_software),
    FOREIGN KEY (id_equipamento) REFERENCES EQUIPAMENTO(id_equipamento)
);

CREATE TABLE LABORATORIO (
	id_laboratorio int primary key auto_increment,
    nome varchar(50) not null,
    andar int(1) not null,
    equipamento int,
    capacidade int(2) not null,
    estado boolean not null default 1,
    data_cad timestamp default current_timestamp,
    FOREIGN KEY (equipamento) REFERENCES EQUIPAMENTO(id_equipamento)
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


    