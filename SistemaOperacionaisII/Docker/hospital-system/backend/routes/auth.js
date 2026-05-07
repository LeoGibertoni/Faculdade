const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// POST /auth/login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const result = await db.query('SELECT * FROM usuarios WHERE email = $1 LIMIT 1', [email]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos' });
        }

        const user = result.rows[0];

        let passwordMatches = false;

        // If stored password looks like a bcrypt hash, use bcrypt to compare
        if (typeof user.senha === 'string' && user.senha.startsWith('$2')) {
            passwordMatches = await bcrypt.compare(senha, user.senha);
        } else {
            // fallback: plain text comparison (not recommended for production)
            passwordMatches = senha === user.senha;
        }

        if (!passwordMatches) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '8h' });

        res.json({ token, user: { id: user.id, nome: user.nome, email: user.email } });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro interno' });
    }
});

module.exports = router;

// POST /auth/register
router.post('/register', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const hash = await bcrypt.hash(senha, 8);
        await db.query('INSERT INTO usuarios(nome, email, senha) VALUES($1,$2,$3)', [nome, email, hash]);
        res.json({ message: 'Usuário criado' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao criar usuário' });
    }
});

// POST /auth/change-password
router.post('/change-password', async (req, res) => {
    const { token, novaSenha } = req.body;
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const hash = await bcrypt.hash(novaSenha, 8);
        await db.query('UPDATE usuarios SET senha = $1 WHERE id = $2', [hash, payload.id]);
        res.json({ message: 'Senha alterada' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Token inválido ou erro' });
    }
});