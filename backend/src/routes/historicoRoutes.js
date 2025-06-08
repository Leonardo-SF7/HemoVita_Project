const express = require('express');
const router = express.Router();
const historicoController = require('../controllers/historicoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', historicoController.createHistorico);
router.get('/', historicoController.listHistoricos);
router.get('/:id', historicoController.getHistoricoById);
router.put('/:id', historicoController.updateHistorico);
router.delete('/:id', historicoController.deleteHistorico);

module.exports = router;