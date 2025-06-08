const express = require('express');
const router = express.Router();
const triagemController = require('../controllers/triagemController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

router.post('/', roleMiddleware(['enfermeiro']), triagemController.createTriagem);
router.put('/:id', roleMiddleware(['enfermeiro']), triagemController.updateTriagem);
router.delete('/:id', roleMiddleware(['enfermeiro']), triagemController.deleteTriagem);
router.get('/', triagemController.listTriagens);
router.get('/:id', triagemController.getTriagemById);

module.exports = router;