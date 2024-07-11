import { Request, Response, NextFunction } from 'express';

import { users } from '../controllers/auth';

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === parseInt(id));
  if (!user) {
    next({ status: 404, message: 'User not found' });
    return;
  }
  res.json({ user });
};

export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (users.length === 0) {
    next({ status: 404, message: 'No users found' });
    return;
  }
  res.json({ users });
};
