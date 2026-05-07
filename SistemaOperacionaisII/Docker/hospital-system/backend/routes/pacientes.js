const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const result = await db.query('SELECT * FROM pacientes');
    res.json(result.rows);
});

router.post('/', async (req, res) => {
    const { nome, idade, cpf, telefone } = req.body;

    await db.query(
        'INSERT INTO pacientes(nome, idade, cpf, telefone) VALUES($1,$2,$3,$4)',
        [nome, idade, cpf, telefone]
    );

    res.json({ message: 'Paciente cadastrado' });
});

module.exports = router;