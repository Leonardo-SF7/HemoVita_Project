const express = require('express');
const router = express.Router();
const checklistTriagemController = require('../controllers/checklistTriagemController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use(authMiddleware);

router.post('/', roleMiddleware(['tecnico']), checklistTriagemController.createChecklist);
router.get('/', checklistTriagemController.listChecklists);
router.get('/:id', checklistTriagemController.getChecklistById);
router.put('/:id', roleMiddleware(['tecnico']), checklistTriagemController.updateChecklist);
router.delete('/:id', roleMiddleware(['tecnico']), checklistTriagemController.deleteChecklist);

module.exports = router;