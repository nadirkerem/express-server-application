import { Router } from 'express';
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  getTasksByUserId,
  getTaskForm,
} from '../controllers/tasks';

const router = Router();

router.get('/', getTasks);
router.get('/new', getTaskForm);
router.get('/:id', getTaskById);
router.get('/user/:user_id', getTasksByUserId);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
