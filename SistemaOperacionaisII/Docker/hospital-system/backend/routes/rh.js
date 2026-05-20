const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const result = await db.query('SELECT f.*, d.nome AS departamento, c.nome AS cargo FROM funcionarios f LEFT JOIN departamentos d ON d.id = f.departamento_id LEFT JOIN cargos c ON c.id = f.cargo_id');
    res.json(result.rows);
});

router.post('/', async (req, res) => {
    const { nome, departamento_id, cargo_id, matricula, data_admissao } = req.body;
    await db.query('INSERT INTO funcionarios(nome, departamento_id, cargo_id, matricula, data_admissao) VALUES($1,$2,$3,$4,$5)', [nome, departamento_id, cargo_id, matricula, data_admissao]);
    res.json({ message: 'Funcionário criado' });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, departamento_id, cargo_id, matricula, data_admissao } = req.body;
    await db.query('UPDATE funcionarios SET nome=$1, departamento_id=$2, cargo_id=$3, matricula=$4, data_admissao=$5 WHERE id=$6', [nome, departamento_id, cargo_id, matricula, data_admissao, id]);
    res.json({ message: 'Funcionário atualizado' });
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await db.query('DELETE FROM funcionarios WHERE id = $1', [id]);
    res.json({ message: 'Funcionário removido' });
});

module.exports = router;
