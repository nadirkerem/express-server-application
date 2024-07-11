import { Router } from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTasksById,
  getTasksByUserId,
} from '../controllers/tasks';

const router = Router();

router.get('/', getTasks);
router.get('/:id', getTasksById);
router.get('/user/:user_id', getTasksByUserId);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
