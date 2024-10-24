-- Tabela de Laboratórios
CREATE USER 'teste'@'localhost' IDENTIFIED BY 'teste';
GRANT ALL PRIVILEGES ON reserva.* TO 'teste'@'localhost'; 
FLUSH PRIVILEGES;


CREATE TABLE Laboratorio (
    idLaboratorio INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    andar VARCHAR(10),
    equipamento VARCHAR(255),
    capacidade INT
);

-- Tabela de Cursos
CREATE TABLE Curso (
    idCurso INT PRIMARY KEY AUTO_INCREMENT,
    nomeCurso VARCHAR(100) NOT NULL
);

-- Tabela de Disciplinas
CREATE TABLE Disciplina (
    idDisciplina INT PRIMARY KEY AUTO_INCREMENT,
    nomeDisciplina VARCHAR(100) NOT NULL,
    semestre INT NOT NULL,
    idCurso INT,
    FOREIGN KEY (idCurso) REFERENCES Curso(idCurso)
);

-- Tabela de Usuários
CREATE TABLE Usuarios (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
    tipo VARCHAR(100) NOT NULL
);

-- Tabela intermediária para Usuários e Disciplinas (Muitos-para-Muitos)
CREATE TABLE UsuarioDisciplina (
    idUsuario INT,
    idDisciplina INT,
    PRIMARY KEY (idUsuario, idDisciplina),
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario),
    FOREIGN KEY (idDisciplina) REFERENCES Disciplina(idDisciplina)
);

-- Tabela de Calendários (Contém data e horários)
CREATE TABLE Calendarios (
    idCalendario INT PRIMARY KEY AUTO_INCREMENT,
    data DATE NOT NULL,
    horaInicio TIME NOT NULL,
    horaFim TIME NOT NULL,
    idLaboratorio INT,
    FOREIGN KEY (idLaboratorio) REFERENCES Laboratorio(idLaboratorio)
);

-- Tabela de Gestores
CREATE TABLE Gestao (
    idGestao INT PRIMARY KEY AUTO_INCREMENT,
    nomeGestor VARCHAR(100) NOT NULL,
    senhaGestor VARCHAR(100) NOT NULL
);

-- Tabela de Reservas (Referência ao Calendário e status da reserva)
CREATE TABLE Reserva (
    idReserva INT PRIMARY KEY AUTO_INCREMENT,
    atividade VARCHAR(255),
    equipamentosUsados VARCHAR(255),
    observacoes VARCHAR(255),
    status_reserva VARCHAR(50),
    idUsuario INT,
    idCalendario INT,
    idGestao INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuarios(idUsuario),
    FOREIGN KEY (idCalendario) REFERENCES Calendarios(idCalendario),
    FOREIGN KEY (idGestao) REFERENCES Gestao(idGestao)
);

-- Tabela de Relatórios (Captura todos os dados de uma reserva realizada)
CREATE TABLE Relatorio (
    idRelatorio INT PRIMARY KEY AUTO_INCREMENT,
    dataGerada DATE NOT NULL,
    atividade VARCHAR(255),
    equipamentosUsados VARCHAR(255),
    observacoes VARCHAR(255),
    status_relatorio VARCHAR(50),
    nomeUsuario VARCHAR(100),
    emailUsuario VARCHAR(100),
    nomeLaboratorio VARCHAR(100),
    dataReserva DATE,
    horaInicio TIME,
    horaFim TIME,
    idReserva INT,
    idGestao INT,
    FOREIGN KEY (idReserva) REFERENCES Reserva(idReserva),
    FOREIGN KEY (idGestao) REFERENCES Gestao(idGestao)
);

-- Tabela de Calendário Panorâmico (Referência ao Calendário e status da Reserva)
CREATE TABLE CalendarioPanoramico (
    idCalenPano INT PRIMARY KEY AUTO_INCREMENT,
    idCalendario INT,
    idLaboratorio INT,
    idReserva INT,
    FOREIGN KEY (idLaboratorio) REFERENCES Laboratorio(idLaboratorio),
    FOREIGN KEY (idReserva) REFERENCES Reserva(idReserva),
    FOREIGN KEY (idCalendario) REFERENCES Calendarios(idCalendario)
);
