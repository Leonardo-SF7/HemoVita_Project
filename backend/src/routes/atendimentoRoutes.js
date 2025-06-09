const express = require('express');
const router = express.Router();
const atendimentoController = require('../controllers/atendimentoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

/**
 * @swagger
 * /api/atendimentos:
 *   post:
 *     summary: Cria um novo atendimento
 *     tags:
 *       - Atendimentos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dt_atendimento:
 *                 type: string
 *                 format: date
 *               id_paciente:
 *                 type: integer
 *               id_profissional:
 *                 type: integer
 *               observacoes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Atendimento criado com sucesso
 */
router.post('/', atendimentoController.createAtendimento);

/**
 * @swagger
 * /api/atendimentos:
 *   get:
 *     summary: Lista todos os atendimentos
 *     tags:
 *       - Atendimentos
 *     responses:
 *       200:
 *         description: Lista de atendimentos
 */
router.get('/', atendimentoController.listAtendimentos);

/**
 * @swagger
 * /api/atendimentos/{id}:
 *   get:
 *     summary: Busca um atendimento pelo ID
 *     tags:
 *       - Atendimentos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Atendimento encontrado
 *       404:
 *         description: Atendimento não encontrado
 */
router.get('/:id', atendimentoController.getAtendimentoById);

/**
 * @swagger
 * /api/atendimentos/{id}:
 *   put:
 *     summary: Atualiza um atendimento pelo ID
 *     tags:
 *       - Atendimentos
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
 *               dt_atendimento:
 *                 type: string
 *                 format: date
 *               id_paciente:
 *                 type: integer
 *               id_profissional:
 *                 type: integer
 *               observacoes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Atendimento atualizado com sucesso
 *       404:
 *         description: Atendimento não encontrado
 */
router.put('/:id', atendimentoController.updateAtendimento);

/**
 * @swagger
 * /api/atendimentos/{id}:
 *   delete:
 *     summary: Remove um atendimento pelo ID
 *     tags:
 *       - Atendimentos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Atendimento removido com sucesso
 *       404:
 *         description: Atendimento não encontrado
 */
router.delete('/:id', atendimentoController.deleteAtendimento);

module.exports = router;