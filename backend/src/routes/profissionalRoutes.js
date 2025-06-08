const express = require('express');
const router = express.Router();
const profissionalController = require('../controllers/profissionalController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');


router.use(authMiddleware);

router.post('/', roleMiddleware(['admin']), profissionalController.createProfissional);
router.get('/', profissionalController.listProfissionais);
router.get('/:id', profissionalController.getProfissionalById);
router.put('/:id', roleMiddleware(['admin']), profissionalController.updateProfissional);
router.delete('/:id', roleMiddleware(['admin']), profissionalController.deleteProfissional);

module.exports = router;