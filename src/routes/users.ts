import { Router } from 'express';

import { getAllUsers, getUserById } from '../controllers/users';

const router = Router();

router.get('/:id', getUserById);
router.get('/', getAllUsers);

export default router;
