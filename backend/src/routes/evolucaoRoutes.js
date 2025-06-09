const express = require('express');
const router = express.Router();
const evolucaoController = require('../controllers/evolucaoController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

/**
 * @swagger
 * /api/evolucoes:
 *   post:
 *     summary: Cria uma nova evolução
 *     tags:
 *       - Evoluções
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
 *         description: Evolução criada com sucesso
 */
router.post('/', roleMiddleware(['medico', 'enfermeiro']), evolucaoController.createEvolucao);

/**
 * @swagger
 * /api/evolucoes:
 *   get:
 *     summary: Lista todas as evoluções
 *     tags:
 *       - Evoluções
 *     responses:
 *       200:
 *         description: Lista de evoluções
 */
router.get('/', evolucaoController.listEvolucoes);

/**
 * @swagger
 * /api/evolucoes/{id}:
 *   get:
 *     summary: Busca uma evolução pelo ID
 *     tags:
 *       - Evoluções
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evolução encontrada
 *       404:
 *         description: Evolução não encontrada
 */
router.get('/:id', evolucaoController.getEvolucaoById);

/**
 * @swagger
 * /api/evolucoes/{id}:
 *   put:
 *     summary: Atualiza uma evolução pelo ID
 *     tags:
 *       - Evoluções
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
 *         description: Evolução atualizada com sucesso
 *       404:
 *         description: Evolução não encontrada
 */
router.put('/:id', roleMiddleware(['medico', 'enfermeiro']), evolucaoController.updateEvolucao);

/**
 * @swagger
 * /api/evolucoes/{id}:
 *   delete:
 *     summary: Remove uma evolução pelo ID
 *     tags:
 *       - Evoluções
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evolução removida com sucesso
 *       404:
 *         description: Evolução não encontrada
 */
router.delete('/:id', roleMiddleware(['medico', 'enfermeiro']), evolucaoController.deleteEvolucao);

module.exports = router;