const express = require('express');
const router = express.Router();
const profissionalController = require('../controllers/profissionalController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');


router.use(authMiddleware);

/**
 * @swagger
 * /api/profissionais:
 *   post:
 *     summary: Cria um novo profissional
 *     tags:
 *       - Profissionais
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               especialidade:
 *                 type: string
 *               registro:
 *                 type: string
 *     responses:
 *       201:
 *         description: Profissional criado com sucesso
 */
router.post('/', roleMiddleware(['admin']), profissionalController.createProfissional);

/**
 * @swagger
 * /api/profissionais:
 *   get:
 *     summary: Lista todos os profissionais
 *     tags:
 *       - Profissionais
 *     responses:
 *       200:
 *         description: Lista de profissionais
 */
router.get('/', profissionalController.listProfissionais);

/**
 * @swagger
 * /api/profissionais/{id}:
 *   get:
 *     summary: Busca um profissional pelo ID
 *     tags:
 *       - Profissionais
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Profissional encontrado
 *       404:
 *         description: Profissional não encontrado
 */
router.get('/:id', profissionalController.getProfissionalById);

/**
 * @swagger
 * /api/profissionais/{id}:
 *   put:
 *     summary: Atualiza um profissional pelo ID
 *     tags:
 *       - Profissionais
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
 *               nome:
 *                 type: string
 *               especialidade:
 *                 type: string
 *               registro:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profissional atualizado com sucesso
 *       404:
 *         description: Profissional não encontrado
 */
router.put('/:id', roleMiddleware(['admin']), profissionalController.updateProfissional);

/**
 * @swagger
 * /api/profissionais/{id}:
 *   delete:
 *     summary: Remove um profissional pelo ID
 *     tags:
 *       - Profissionais
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Profissional removido com sucesso
 *       404:
 *         description: Profissional não encontrado
 */
router.delete('/:id', roleMiddleware(['admin']), profissionalController.deleteProfissional);

module.exports = router;