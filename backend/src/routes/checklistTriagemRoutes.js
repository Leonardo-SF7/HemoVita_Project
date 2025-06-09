const express = require('express');
const router = express.Router();
const checklistTriagemController = require('../controllers/checklistTriagemController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

/**
 * @swagger
 * /api/checklists:
 *   post:
 *     summary: Cria um novo checklist de triagem
 *     tags:
 *       - Checklists de Triagem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               perguntas:
 *                 type: array
 *                 items:
 *                   type: string
 *               respostas:
 *                 type: array
 *                 items:
 *                   type: string
 *               data:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Checklist criado com sucesso
 */
router.post('/', roleMiddleware(['tecnico']), checklistTriagemController.createChecklist);

/**
 * @swagger
 * /api/checklists:
 *   get:
 *     summary: Lista todos os checklists de triagem
 *     tags:
 *       - Checklists de Triagem
 *     responses:
 *       200:
 *         description: Lista de checklists
 */
router.get('/', checklistTriagemController.listChecklists);

/**
 * @swagger
 * /api/checklists/{id}:
 *   get:
 *     summary: Busca um checklist de triagem pelo ID
 *     tags:
 *       - Checklists de Triagem
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Checklist encontrado
 *       404:
 *         description: Checklist não encontrado
 */
router.get('/:id', checklistTriagemController.getChecklistById);

/**
 * @swagger
 * /api/checklists/{id}:
 *   put:
 *     summary: Atualiza um checklist de triagem pelo ID
 *     tags:
 *       - Checklists de Triagem
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
 *               perguntas:
 *                 type: array
 *                 items:
 *                   type: string
 *               respostas:
 *                 type: array
 *                 items:
 *                   type: string
 *               data:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Checklist atualizado com sucesso
 *       404:
 *         description: Checklist não encontrado
 */
router.put('/:id', roleMiddleware(['tecnico']), checklistTriagemController.updateChecklist);

/**
 * @swagger
 * /api/checklists/{id}:
 *   delete:
 *     summary: Remove um checklist de triagem pelo ID
 *     tags:
 *       - Checklists de Triagem
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Checklist removido com sucesso
 *       404:
 *         description: Checklist não encontrado
 */
router.delete('/:id', roleMiddleware(['tecnico']), checklistTriagemController.deleteChecklist);

module.exports = router;