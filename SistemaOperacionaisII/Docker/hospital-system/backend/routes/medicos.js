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

// DELETE /medicos/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        await db.query('DELETE FROM medicos WHERE id = $1', [id]);
        res.json({ message: 'Médico removido' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erro ao remover médico' });
    }
});

// PUT /medicos/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, especialidade, crm } = req.body;
    try{
        await db.query('UPDATE medicos SET nome=$1, especialidade=$2, crm=$3 WHERE id=$4', [nome, especialidade, crm, id]);
        res.json({ message: 'Médico atualizado' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar médico' });
    }
});

module.exports = router;