const express = require("express");
const mysql = require("mysql2");

const server = express();

server.use(express.json());

const bd = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "FACULDADE2"
});

bd.connect((err) =>{
    if(err){
        console.log("Erro ao conectar ao banco: ", err);
        return;
    } console.log("Conectado ao MySQL!");
});

server.get("/", (req, res) => {
    const sql = "SELECT * FROM ALUNOS"

    bd.query(sql, (err, result) =>{
        res.json(result);
        res.status(200);
    })
    res.send("API Funcionando");
});

server.post("/alunos", (req, res) =>{
    const {nome, idade} = req.body;
    const sql = "INSERT INTO ALUNOS (nome, idade) VALUES (?, ?)";
    bd.query(sql, [nome, idade], (err, result) => {
        if(err)
            return res.status(500)
        res.status(201).send("Aluno cadastrado com sucesso!");
    });
});

server.listen(7000, () => {
    console.log("Servidor rodando na porta 3530");
});