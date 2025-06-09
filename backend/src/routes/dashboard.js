const express = require('express');
const router = express.Router();
const db = require('../utils/db');

/**
 * @swagger
 * /api/dashboard/totais:
 *   get:
 *     summary: Retorna totais de pacientes, atendimentos e exames
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Totais retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalPacientes:
 *                   type: integer
 *                 totalAtendimentos:
 *                   type: integer
 *                 totalExames:
 *                   type: integer
 */
router.get('/totais', async (req, res) => {
  const [[{ totalPacientes }]] = await db.query('SELECT COUNT(*) as totalPacientes FROM Paciente');
  const [[{ totalAtendimentos }]] = await db.query('SELECT COUNT(*) as totalAtendimentos FROM Atendimento');
  const [[{ totalExames }]] = await db.query('SELECT COUNT(*) as totalExames FROM Exame');
  res.json({ totalPacientes, totalAtendimentos, totalExames });
});

/**
 * @swagger
 * /api/dashboard/atendimentos-mes:
 *   get:
 *     summary: Retorna o total de atendimentos agrupados por mês
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Lista de atendimentos por mês
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   mes:
 *                     type: integer
 *                   atendimentos:
 *                     type: integer
 */
router.get('/atendimentos-mes', async (req, res) => {
  const [rows] = await db.query(`
    SELECT MONTH(dt_atendimento) as mes, COUNT(*) as atendimentos
    FROM Atendimento
    GROUP BY mes
    ORDER BY mes
  `);
  res.json(rows);
});

/**
 * @swagger
 * /api/dashboard/dados-mensais:
 *   get:
 *     summary: Retorna os atendimentos por mês
 *     tags:
 *       - Dashboard
 *     responses:
 *       200:
 *         description: Lista de atendimentos por mês
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   mes:
 *                     type: integer
 *                   atendimentos:
 *                     type: integer
 */
router.get('/dados-mensais', async (req, res) => {
  const [rows] = await db.query(`
    SELECT 
      MONTH(dt_atendimento) as mes,
      COUNT(*) as atendimentos
    FROM Atendimento
    GROUP BY mes
    ORDER BY mes
  `);
  res.json(rows);
});

module.exports = router;