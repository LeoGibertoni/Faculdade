CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(255)
);

CREATE TABLE medicos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    especialidade VARCHAR(100),
    crm VARCHAR(50)
);

CREATE TABLE pacientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    idade INTEGER,
    cpf VARCHAR(20),
    telefone VARCHAR(20)
);

CREATE TABLE consultas (
    id SERIAL PRIMARY KEY,
    paciente_id INTEGER REFERENCES pacientes(id),
    medico_id INTEGER REFERENCES medicos(id),
    data_consulta TIMESTAMP,
    observacoes TEXT
);

CREATE TABLE prontuarios (
    id SERIAL PRIMARY KEY,
    paciente_id INTEGER REFERENCES pacientes(id),
    descricao TEXT,
    data_prontuario TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exames (
    id SERIAL PRIMARY KEY,
    paciente_id INTEGER REFERENCES pacientes(id),
    exame VARCHAR(100),
    resultado TEXT,
    data_exame TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RH: departamentos, cargos e funcionários
CREATE TABLE departamentos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE cargos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE funcionarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    departamento_id INTEGER REFERENCES departamentos(id),
    cargo_id INTEGER REFERENCES cargos(id),
    matricula VARCHAR(50),
    data_admissao DATE
);

-- Financeiro: lançamentos simples
CREATE TABLE lancamentos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255),
    valor NUMERIC(12,2),
    data_lancamento DATE DEFAULT CURRENT_DATE,
    tipo VARCHAR(20) -- 'receita' ou 'despesa'
);

-- Estoque: itens
CREATE TABLE itens_estoque (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    quantidade INTEGER DEFAULT 0,
    unidade VARCHAR(50)
);