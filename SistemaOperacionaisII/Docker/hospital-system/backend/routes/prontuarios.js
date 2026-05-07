const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const result = await db.query('SELECT * FROM prontuarios');
    res.json(result.rows);
});

router.post('/', async (req, res) => {
    const { paciente_id, descricao } = req.body;

    await db.query(
        'INSERT INTO prontuarios(paciente_id, descricao) VALUES($1,$2)',
        [paciente_id, descricao]
    );

    res.json({ message: 'Prontuário salvo' });
});

module.exports = router;