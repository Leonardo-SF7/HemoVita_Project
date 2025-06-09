const express = require('express');
const router = express.Router();
const atestadoController = require('../controllers/atestadoController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

/**
 * @swagger
 * /api/atestados:
 *   post:
 *     summary: Cria um novo atestado
 *     tags:
 *       - Atestados
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
 *         description: Atestado criado com sucesso
 */
router.post('/', roleMiddleware(['medico']), atestadoController.createAtestado);

/**
 * @swagger
 * /api/atestados:
 *   get:
 *     summary: Lista todos os atestados
 *     tags:
 *       - Atestados
 *     responses:
 *       200:
 *         description: Lista de atestados
 */
router.get('/', atestadoController.listAtestados);

/**
 * @swagger
 * /api/atestados/{id}:
 *   get:
 *     summary: Busca um atestado pelo ID
 *     tags:
 *       - Atestados
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Atestado encontrado
 *       404:
 *         description: Atestado não encontrado
 */
router.get('/:id', atestadoController.getAtestadoById);

/**
 * @swagger
 * /api/atestados/{id}:
 *   put:
 *     summary: Atualiza um atestado pelo ID
 *     tags:
 *       - Atestados
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
 *         description: Atestado atualizado com sucesso
 *       404:
 *         description: Atestado não encontrado
 */
router.put('/:id', roleMiddleware(['medico']), atestadoController.updateAtestado);

/**
 * @swagger
 * /api/atestados/{id}:
 *   delete:
 *     summary: Remove um atestado pelo ID
 *     tags:
 *       - Atestados
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Atestado removido com sucesso
 *       404:
 *         description: Atestado não encontrado
 */
router.delete('/:id', roleMiddleware(['medico']), atestadoController.deleteAtestado);

module.exports = router;