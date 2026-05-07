const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const result = await db.query('SELECT * FROM medicos');
    res.json(result.rows);
});

router.post('/', async (req, res) => {
    const { nome, especialidade, crm } = req.body;

    await db.query(
        'INSERT INTO medicos(nome, especialidade, crm) VALUES($1,$2,$3)',
        [nome, especialidade, crm]
    );

    res.json({ message: 'Médico cadastrado' });
});

module.exports = router;