const express = require('express');
const router = express.Router();
const atestadoController = require('../controllers/atestadoController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

router.post('/', roleMiddleware(['medico']), atestadoController.createAtestado);
router.get('/', atestadoController.listAtestados);
router.get('/:id', atestadoController.getAtestadoById);
router.put('/:id', roleMiddleware(['medico']), atestadoController.updateAtestado);
router.delete('/:id', roleMiddleware(['medico']), atestadoController.deleteAtestado);

module.exports = router;