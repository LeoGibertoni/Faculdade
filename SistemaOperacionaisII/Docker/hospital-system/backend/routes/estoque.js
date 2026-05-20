const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const r = await db.query('SELECT * FROM itens_estoque');
    res.json(r.rows);
});

router.post('/', async (req, res) => {
    const { nome, quantidade, unidade } = req.body;
    await db.query('INSERT INTO itens_estoque(nome, quantidade, unidade) VALUES($1,$2,$3)', [nome, quantidade, unidade]);
    res.json({ message: 'Item criado' });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, quantidade, unidade } = req.body;
    await db.query('UPDATE itens_estoque SET nome=$1, quantidade=$2, unidade=$3 WHERE id=$4', [nome, quantidade, unidade, id]);
    res.json({ message: 'Item atualizado' });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM itens_estoque WHERE id=$1', [id]);
    res.json({ message: 'Item removido' });
});

module.exports = router;
