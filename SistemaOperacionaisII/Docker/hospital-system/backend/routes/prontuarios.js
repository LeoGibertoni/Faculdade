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

// DELETE /prontuarios/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        await db.query('DELETE FROM prontuarios WHERE id = $1', [id]);
        res.json({ message: 'Prontuário removido' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erro ao remover prontuário' });
    }
});

// PUT /prontuarios/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { paciente_id, descricao } = req.body;
    try{
        await db.query('UPDATE prontuarios SET paciente_id=$1, descricao=$2 WHERE id=$3', [paciente_id, descricao, id]);
        res.json({ message: 'Prontuário atualizado' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar prontuário' });
    }
});

module.exports = router;