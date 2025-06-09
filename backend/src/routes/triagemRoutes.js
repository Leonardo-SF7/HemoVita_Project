const express = require('express');
const router = express.Router();
const triagemController = require('../controllers/triagemController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

/**
 * @swagger
 * /api/triagens:
 *   post:
 *     summary: Cria uma nova triagem
 *     tags:
 *       - Triagens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pressao:
 *                 type: string
 *               temperatura:
 *                 type: number
 *               peso:
 *                 type: number
 *               altura:
 *                 type: number
 *               id_paciente:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Triagem criada com sucesso
 */
router.post('/', roleMiddleware(['enfermeiro']), triagemController.createTriagem);

/**
 * @swagger
 * /api/triagens/{id}:
 *   put:
 *     summary: Atualiza uma triagem pelo ID
 *     tags:
 *       - Triagens
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
 *               pressao:
 *                 type: string
 *               temperatura:
 *                 type: number
 *               peso:
 *                 type: number
 *               altura:
 *                 type: number
 *               id_paciente:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Triagem atualizada com sucesso
 *       404:
 *         description: Triagem não encontrada
 */
router.put('/:id', roleMiddleware(['enfermeiro']), triagemController.updateTriagem);

/**
 * @swagger
 * /api/triagens/{id}:
 *   delete:
 *     summary: Remove uma triagem pelo ID
 *     tags:
 *       - Triagens
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Triagem removida com sucesso
 *       404:
 *         description: Triagem não encontrada
 */
router.delete('/:id', roleMiddleware(['enfermeiro']), triagemController.deleteTriagem);

/**
 * @swagger
 * /api/triagens:
 *   get:
 *     summary: Lista todas as triagens
 *     tags:
 *       - Triagens
 *     responses:
 *       200:
 *         description: Lista de triagens
 */
router.get('/', triagemController.listTriagens);

/**
 * @swagger
 * /api/triagens/{id}:
 *   get:
 *     summary: Busca uma triagem pelo ID
 *     tags:
 *       - Triagens
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Triagem encontrada
 *       404:
 *         description: Triagem não encontrada
 */
router.get('/:id', triagemController.getTriagemById);

module.exports = router;