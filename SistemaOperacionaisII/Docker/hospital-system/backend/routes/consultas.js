const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
    const result = await db.query(`
        SELECT consultas.*, pacientes.nome AS paciente, medicos.nome AS medico
        FROM consultas
        JOIN pacientes ON pacientes.id = consultas.paciente_id
        JOIN medicos ON medicos.id = consultas.medico_id
    `);

    res.json(result.rows);
});

router.post('/', async (req, res) => {
    const { paciente_id, medico_id, data_consulta, observacoes } = req.body;

    await db.query(
        'INSERT INTO consultas(paciente_id, medico_id, data_consulta, observacoes) VALUES($1,$2,$3,$4)',
        [paciente_id, medico_id, data_consulta, observacoes]
    );

    res.json({ message: 'Consulta agendada' });
});

// DELETE /consultas/:id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        await db.query('DELETE FROM consultas WHERE id = $1', [id]);
        res.json({ message: 'Consulta removida' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erro ao remover consulta' });
    }
});

// PUT /consultas/:id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { paciente_id, medico_id, data_consulta, observacoes } = req.body;
    try{
        await db.query('UPDATE consultas SET paciente_id=$1, medico_id=$2, data_consulta=$3, observacoes=$4 WHERE id=$5', [paciente_id, medico_id, data_consulta, observacoes, id]);
        res.json({ message: 'Consulta atualizada' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Erro ao atualizar consulta' });
    }
});

module.exports = router;