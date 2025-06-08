const express = require('express');
const router = express.Router();
const atendimentoController = require('../controllers/atendimentoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', atendimentoController.createAtendimento);
router.get('/', atendimentoController.listAtendimentos);
router.get('/:id', atendimentoController.getAtendimentoById);
router.put('/:id', atendimentoController.updateAtendimento);
router.delete('/:id', atendimentoController.deleteAtendimento);

module.exports = router;