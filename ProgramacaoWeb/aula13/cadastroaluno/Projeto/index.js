const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors()); 

const bd = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "FACULDADE2"
});

bd.connect((err) => {
    if (err) {
        console.log("Erro ao conectar ao banco: ", err);
        return;
    }
    console.log("Conectado ao MySQL!");
});

server.get("/alunos", (req, res) => {
    const sql = "SELECT * FROM ALUNOS";

    bd.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send("Erro na consulta");
        }
        return res.status(200).json(result);
    });
});

server.post("/alunos", (req, res) => {
    const { nome, idade } = req.body;

    const sql = "INSERT INTO ALUNOS (nome, idade) VALUES (?, ?)";
    bd.query(sql, [nome, idade], (err, result) => {
        if (err) {
            return res.status(500).send("Erro ao cadastrar aluno");
        }
        return res.status(201).send("Aluno cadastrado com sucesso!");
    });
});

server.listen(7000, () => {
    console.log("Servidor rodando na porta 7000");
});
