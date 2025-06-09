const express = require('express');
const router = express.Router();
const historicoController = require('../controllers/historicoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

/**
 * @swagger
 * /api/historicos:
 *   post:
 *     summary: Cria um novo histórico
 *     tags:
 *       - Históricos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *               data:
 *                 type: string
 *                 format: date
 *               id_paciente:
 *                 type: integer
 *               id_profi:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Histórico criado com sucesso
 */
router.post('/', historicoController.createHistorico);

/**
 * @swagger
 * /api/historicos:
 *   get:
 *     summary: Lista todos os históricos
 *     tags:
 *       - Históricos
 *     responses:
 *       200:
 *         description: Lista de históricos
 */
router.get('/', historicoController.listHistoricos);

/**
 * @swagger
 * /api/historicos/{id}:
 *   get:
 *     summary: Busca um histórico pelo ID
 *     tags:
 *       - Históricos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Histórico encontrado
 *       404:
 *         description: Histórico não encontrado
 */
router.get('/:id', historicoController.getHistoricoById);

/**
 * @swagger
 * /api/historicos/{id}:
 *   put:
 *     summary: Atualiza um histórico pelo ID
 *     tags:
 *       - Históricos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *               data:
 *                 type: string
 *                 format: date
 *               id_paciente:
 *                 type: integer
 *               id_profi:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Histórico atualizado com sucesso
 *       404:
 *         description: Histórico não encontrado
 */
router.put('/:id', historicoController.updateHistorico);

/**
 * @swagger
 * /api/historicos/{id}:
 *   delete:
 *     summary: Remove um histórico pelo ID
 *     tags:
 *       - Históricos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Histórico removido com sucesso
 *       404:
 *         description: Histórico não encontrado
 */
router.delete('/:id', historicoController.deleteHistorico);

module.exports = router;