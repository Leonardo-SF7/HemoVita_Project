const express = require('express');
const router = express.Router();
const prontuarioController = require('../controllers/prontuarioController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

router.post('/', roleMiddleware(['medico', 'enfermeiro']), prontuarioController.createProntuario);
router.put('/:id', roleMiddleware(['medico']), prontuarioController.updateProntuario);
router.delete('/:id', roleMiddleware(['medico']), prontuarioController.deleteProntuario);
router.get('/', prontuarioController.listProntuarios);
router.get('/:id', prontuarioController.getProntuarioById);

module.exports = router;