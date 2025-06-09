const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const roleMiddleware = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags:
 *       - Autenticação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/{id}/permissao:
 *   put:
 *     summary: Atualiza a permissão de um usuário
 *     tags:
 *       - Autenticação
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
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Permissão atualizada com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/:id/permissao', roleMiddleware(['admin']), authController.updatePermissao);

module.exports = router;