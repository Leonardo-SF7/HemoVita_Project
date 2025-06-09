const express = require('express');
const router = express.Router();
const prontuarioController = require('../controllers/prontuarioController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

/**
 * @swagger
 * /api/prontuarios:
 *   post:
 *     summary: Cria um novo prontuário
 *     tags:
 *       - Prontuários
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
 *               id_profissional:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Prontuário criado com sucesso
 */
router.post('/', roleMiddleware(['medico', 'enfermeiro']), prontuarioController.createProntuario);

/**
 * @swagger
 * /api/prontuarios/{id}:
 *   put:
 *     summary: Atualiza um prontuário pelo ID
 *     tags:
 *       - Prontuários
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
 *               id_profissional:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Prontuário atualizado com sucesso
 *       404:
 *         description: Prontuário não encontrado
 */
router.put('/:id', roleMiddleware(['medico']), prontuarioController.updateProntuario);

/**
 * @swagger
 * /api/prontuarios/{id}:
 *   delete:
 *     summary: Remove um prontuário pelo ID
 *     tags:
 *       - Prontuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Prontuário removido com sucesso
 *       404:
 *         description: Prontuário não encontrado
 */
router.delete('/:id', roleMiddleware(['medico']), prontuarioController.deleteProntuario);

/**
 * @swagger
 * /api/prontuarios:
 *   get:
 *     summary: Lista todos os prontuários
 *     tags:
 *       - Prontuários
 *     responses:
 *       200:
 *         description: Lista de prontuários
 */
router.get('/', prontuarioController.listProntuarios);

/**
 * @swagger
 * /api/prontuarios/{id}:
 *   get:
 *     summary: Busca um prontuário pelo ID
 *     tags:
 *       - Prontuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Prontuário encontrado
 *       404:
 *         description: Prontuário não encontrado
 */
router.get('/:id', prontuarioController.getProntuarioById);

module.exports = router;