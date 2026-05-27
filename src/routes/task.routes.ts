import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';

const router = Router();
const ctrl = new TaskController();

router.get('/', ctrl.getAll.bind(ctrl));
router.get('/:id', ctrl.getById.bind(ctrl));
router.post('/', ctrl.create.bind(ctrl));
router.put('/:id', ctrl.update.bind(ctrl));
router.delete('/:id', ctrl.delete.bind(ctrl));

export default router;