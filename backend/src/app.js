const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => res.send('API HemoVita rodando!'));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/pacientes', require('./routes/pacienteRoutes'));
app.use('/api/profissionais', require('./routes/profissionalRoutes'));
app.use('/api/exames', require('./routes/exameRoutes'));
app.use('/api/atendimentos', require('./routes/atendimentoRoutes'));
app.use('/api/prontuarios', require('./routes/prontuarioRoutes'));
app.use('/api/historicos', require('./routes/historicoRoutes'));
app.use('/api/farmacia', require('./routes/farmaciaRoutes'));
app.use('/api/atestados', require('./routes/atestadoRoutes'));
app.use('/api/evolucoes', require('./routes/evolucaoRoutes'));
app.use('/api/checklists', require('./routes/checklistTriagemRoutes'));
app.use('/api/triagens', require('./routes/triagemRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));







module.exports = app;