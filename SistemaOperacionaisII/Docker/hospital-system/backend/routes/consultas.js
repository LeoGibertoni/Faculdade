const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const result = await db.query(`
        SELECT consultas.*, pacientes.nome AS paciente, medicos.nome AS medico
        FROM consultas
        JOIN pacientes ON pacientes.id = consultas.paciente_id
        JOIN medicos ON medicos.id = consultas.medico_id
    `);

    res.json(result.rows);
});

router.post('/', async (req, res) => {
    const { paciente_id, medico_id, data_consulta, observacoes } = req.body;

    await db.query(
        'INSERT INTO consultas(paciente_id, medico_id, data_consulta, observacoes) VALUES($1,$2,$3,$4)',
        [paciente_id, medico_id, data_consulta, observacoes]
    );

    res.json({ message: 'Consulta agendada' });
});

module.exports = router;