const express = require('express');
const router = express.Router();
const evolucaoController = require('../controllers/evolucaoController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

router.post('/', roleMiddleware(['medico', 'enfermeiro']), evolucaoController.createEvolucao);
router.get('/', evolucaoController.listEvolucoes);
router.get('/:id', evolucaoController.getEvolucaoById);
router.put('/:id', roleMiddleware(['medico', 'enfermeiro']), evolucaoController.updateEvolucao);
router.delete('/:id', roleMiddleware(['medico', 'enfermeiro']), evolucaoController.deleteEvolucao);

module.exports = router;