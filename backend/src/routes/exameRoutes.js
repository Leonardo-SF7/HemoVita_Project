const express = require('express');
const router = express.Router();
const exameController = require('../controllers/exameController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

/**
 * @swagger
 * /api/exames:
 *   post:
 *     summary: Cria um novo exame
 *     tags:
 *       - Exames
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo_exame:
 *                 type: string
 *               resultado:
 *                 type: number
 *               dt_exame:
 *                 type: string
 *                 format: date
 *               id_paciente:
 *                 type: integer
 *               id_profi:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Exame criado com sucesso
 */
router.post('/', roleMiddleware(['medico']), exameController.createExame);

/**
 * @swagger
 * /api/exames:
 *   get:
 *     summary: Lista todos os exames
 *     tags:
 *       - Exames
 *     responses:
 *       200:
 *         description: Lista de exames
 */
router.get('/', exameController.listExames);

/**
 * @swagger
 * /api/exames/{id}:
 *   get:
 *     summary: Busca um exame pelo ID
 *     tags:
 *       - Exames
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exame encontrado
 *       404:
 *         description: Exame não encontrado
 */
router.get('/:id', exameController.getExameById);

/**
 * @swagger
 * /api/exames/{id}:
 *   put:
 *     summary: Atualiza um exame pelo ID
 *     tags:
 *       - Exames
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
 *               tipo_exame:
 *                 type: string
 *               resultado:
 *                 type: number
 *               dt_exame:
 *                 type: string
 *                 format: date
 *               id_paciente:
 *                 type: integer
 *               id_profi:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Exame atualizado com sucesso
 *       404:
 *         description: Exame não encontrado
 */
router.put('/:id', exameController.updateExame);

/**
 * @swagger
 * /api/exames/{id}:
 *   delete:
 *     summary: Remove um exame pelo ID
 *     tags:
 *       - Exames
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exame removido com sucesso
 *       404:
 *         description: Exame não encontrado
 */
router.delete('/:id', exameController.deleteExame);

module.exports = router;