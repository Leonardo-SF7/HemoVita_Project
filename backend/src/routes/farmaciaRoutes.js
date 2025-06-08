const express = require('express');
const router = express.Router();
const farmaciaController = require('../controllers/farmaciaController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');


router.use(authMiddleware);

router.post('/', roleMiddleware(['enfermeiro']), farmaciaController.createMedicamento);
router.get('/', roleMiddleware(['enfermeiro']), farmaciaController.listMedicamentos);
router.get('/:id', roleMiddleware(['enfermeiro']), farmaciaController.getMedicamentoById);
router.put('/:id', roleMiddleware(['enfermeiro']), farmaciaController.updateMedicamento);
router.delete('/:id', roleMiddleware(['enfermeiro']), farmaciaController.deleteMedicamento);

module.exports = router;