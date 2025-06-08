const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

router.get('/', roleMiddleware(['admin']), usuarioController.getAll);

router.post('/', roleMiddleware(['admin']), usuarioController.create);

router.delete('/:id', roleMiddleware(['admin']), usuarioController.delete);


module.exports = router;