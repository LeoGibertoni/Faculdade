const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const result = await db.query('SELECT * FROM exames');
    res.json(result.rows);
});

router.post('/', async (req, res) => {
    const { paciente_id, exame, resultado } = req.body;

    await db.query(
        'INSERT INTO exames(paciente_id, exame, resultado) VALUES($1,$2,$3)',
        [paciente_id, exame, resultado]
    );

    res.json({ message: 'Exame cadastrado' });
});

module.exports = router;