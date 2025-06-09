const express = require('express');
const router = express.Router();
const farmaciaController = require('../controllers/farmaciaController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');


router.use(authMiddleware);

/**
 * @swagger
 * /api/farmacia:
 *   post:
 *     summary: Cadastra um novo medicamento
 *     tags:
 *       - Farmácia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               quantidade:
 *                 type: integer
 *               validade:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Medicamento cadastrado com sucesso
 */
router.post('/', roleMiddleware(['enfermeiro']), farmaciaController.createMedicamento);

/**
 * @swagger
 * /api/farmacia:
 *   get:
 *     summary: Lista todos os medicamentos
 *     tags:
 *       - Farmácia
 *     responses:
 *       200:
 *         description: Lista de medicamentos
 */
router.get('/', roleMiddleware(['enfermeiro']), farmaciaController.listMedicamentos);

/**
 * @swagger
 * /api/farmacia/{id}:
 *   get:
 *     summary: Busca um medicamento pelo ID
 *     tags:
 *       - Farmácia
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Medicamento encontrado
 *       404:
 *         description: Medicamento não encontrado
 */
router.get('/:id', roleMiddleware(['enfermeiro']), farmaciaController.getMedicamentoById);

/**
 * @swagger
 * /api/farmacia/{id}:
 *   put:
 *     summary: Atualiza um medicamento pelo ID
 *     tags:
 *       - Farmácia
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
 *               quantidade:
 *                 type: integer
 *               validade:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Medicamento atualizado com sucesso
 *       404:
 *         description: Medicamento não encontrado
 */
router.put('/:id', roleMiddleware(['enfermeiro']), farmaciaController.updateMedicamento);

/**
 * @swagger
 * /api/farmacia/{id}:
 *   delete:
 *     summary: Remove um medicamento pelo ID
 *     tags:
 *       - Farmácia
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Medicamento removido com sucesso
 *       404:
 *         description: Medicamento não encontrado
 */
router.delete('/:id', roleMiddleware(['enfermeiro']), farmaciaController.deleteMedicamento);

module.exports = router;