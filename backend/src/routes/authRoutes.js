const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/login', usuarioController.login);

router.use(authMiddleware);

router.put('/:id/permissao', roleMiddleware(['admin']), usuarioController.updateRole);

module.exports = router;