import { Request, Response, NextFunction } from 'express';
import { User } from '../interfaces/user';

export let users: User[] = [];
let currentUserId = 1;

export const register = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({ status: 400, message: 'Username and password are required' });
    return;
  }
  const newUser: User = { id: currentUserId++, username, password };
  users.push(newUser);
  res.status(201).json({ message: 'User registered', user: newUser });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({ status: 400, message: 'Username and password are required' });
    return;
  }
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    next({ status: 401, message: 'Invalid credentials' });
    return;
  }
  res.json({ message: 'User logged in', user });
};
