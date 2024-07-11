import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../interfaces/user';

export let users: User[] = [];
let currentUserId = 1;

// generateToken function...

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({ status: 400, message: 'Username and password are required' });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: currentUserId++,
    username,
    password: hashedPassword,
  };
  users.push(newUser);
  res.json({ message: 'User registered' });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({ status: 400, message: 'Username and password are required' });
    return;
  }
  const user = users.find((u) => u.username === username);
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ message: 'User logged in' });
  } else {
    next({ status: 401, message: 'Invalid credentials' });
  }
};
