const express = require('express');
const router = express.Router();
const exameController = require('../controllers/exameController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');


router.use(authMiddleware);

router.post('/', roleMiddleware(['medico']), exameController.createExame);
router.get('/', exameController.listExames);
router.get('/:id', exameController.getExameById);
router.put('/:id', exameController.updateExame);
router.delete('/:id', exameController.deleteExame);

module.exports = router;