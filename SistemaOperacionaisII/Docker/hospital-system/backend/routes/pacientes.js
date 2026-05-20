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

// DELETE /pacientes/:id -> remove paciente by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM pacientes WHERE id = $1', [id]);
        res.json({ message: 'Paciente removido' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao remover paciente' });
    }
});

module.exports = router;