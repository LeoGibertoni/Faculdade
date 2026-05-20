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

// DELETE /exames/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        await db.query('DELETE FROM exames WHERE id = $1', [id]);
        res.json({ message: 'Exame removido' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erro ao remover exame' });
    }
});

// PUT /exames/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { paciente_id, exame, resultado } = req.body;
    try{
        await db.query('UPDATE exames SET paciente_id=$1, exame=$2, resultado=$3 WHERE id=$4', [paciente_id, exame, resultado, id]);
        res.json({ message: 'Exame atualizado' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar exame' });
    }
});

module.exports = router;