const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const pacientesRoutes = require('./routes/pacientes');
const medicosRoutes = require('./routes/medicos');
const consultasRoutes = require('./routes/consultas');
const prontuariosRoutes = require('./routes/prontuarios');
const examesRoutes = require('./routes/exames');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/pacientes', pacientesRoutes);
app.use('/medicos', medicosRoutes);
app.use('/consultas', consultasRoutes);
app.use('/prontuarios', prontuariosRoutes);
app.use('/exames', examesRoutes);

// Root route to confirm backend is running
app.get('/', (req, res) => {
    res.send('Hospital backend API is running. Use the API routes under /pacientes, /medicos, /consultas, /prontuarios, /exames');
});

app.listen(3001, () => {
    console.log('Backend rodando na porta 3001');
});