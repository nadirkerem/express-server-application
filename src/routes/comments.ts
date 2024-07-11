import { Router } from 'express';

import {
  addComment,
  deleteComment,
  getCommentsByTaskId,
  updateComment,
} from '../controllers/comments';

const router = Router();

router.get('/task/:taskId', getCommentsByTaskId);
router.post('/', addComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;
