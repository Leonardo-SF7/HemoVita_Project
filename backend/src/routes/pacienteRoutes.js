const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

/**
 * @swagger
 * /api/pacientes:
 *   get:
 *     summary: Lista todos os pacientes
 *     tags:
 *       - Pacientes
 *     responses:
 *       200:
 *         description: Lista de pacientes
 */
router.get('/', pacienteController.listPacientes);

/**
 * @swagger
 * /api/pacientes:
 *   post:
 *     summary: Cria um novo paciente
 *     tags:
 *       - Pacientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome_paciente:
 *                 type: string
 *               idade:
 *                 type: integer
 *               sexo:
 *                 type: string
 *               t_sanguineo:
 *                 type: string
 *               endereco:
 *                 type: string
 *               est_civil:
 *                 type: string
 *               dt_nascimento:
 *                 type: string
 *                 format: date
 *               nome_acomp:
 *                 type: string
 *               cpf_acomp:
 *                 type: string
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso
 */
router.post('/', pacienteController.createPaciente);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   get:
 *     summary: Busca um paciente pelo ID
 *     tags:
 *       - Pacientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *       404:
 *         description: Paciente não encontrado
 */
router.get('/:id', pacienteController.getPacienteById);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   put:
 *     summary: Atualiza um paciente pelo ID
 *     tags:
 *       - Pacientes
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
 *               nome_paciente:
 *                 type: string
 *               idade:
 *                 type: integer
 *               sexo:
 *                 type: string
 *               t_sanguineo:
 *                 type: string
 *               endereco:
 *                 type: string
 *               est_civil:
 *                 type: string
 *               dt_nascimento:
 *                 type: string
 *                 format: date
 *               nome_acomp:
 *                 type: string
 *               cpf_acomp:
 *                 type: string
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso
 *       404:
 *         description: Paciente não encontrado
 */
router.put('/:id', pacienteController.updatePaciente);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   delete:
 *     summary: Remove um paciente pelo ID
 *     tags:
 *       - Pacientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente removido com sucesso
 *       404:
 *         description: Paciente não encontrado
 */
router.delete('/:id', pacienteController.deletePaciente);

module.exports = router;