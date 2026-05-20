const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const r = await db.query('SELECT * FROM lancamentos ORDER BY data_lancamento DESC');
    res.json(r.rows);
});

router.post('/', async (req, res) => {
    const { descricao, valor, data_lancamento, tipo } = req.body;
    await db.query('INSERT INTO lancamentos(descricao, valor, data_lancamento, tipo) VALUES($1,$2,$3,$4)', [descricao, valor, data_lancamento, tipo]);
    res.json({ message: 'Lançamento criado' });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { descricao, valor, data_lancamento, tipo } = req.body;
    await db.query('UPDATE lancamentos SET descricao=$1, valor=$2, data_lancamento=$3, tipo=$4 WHERE id=$5', [descricao, valor, data_lancamento, tipo, id]);
    res.json({ message: 'Lançamento atualizado' });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM lancamentos WHERE id=$1', [id]);
    res.json({ message: 'Lançamento removido' });
});

module.exports = router;
