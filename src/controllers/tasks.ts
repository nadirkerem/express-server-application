import { Request, Response, NextFunction } from 'express';
import { Task } from '../interfaces/task';

let tasks: Task[] = [];
let currentId = 1;

export const getTasks = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (tasks.length === 0) {
    next({ status: 404, message: 'No tasks found' });
  }
  res.json(tasks);
};

export const createTask = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let newTask: Task = req.body;

  if (!newTask.title || !newTask.description || !newTask.deadline) {
    next({
      status: 400,
      message: 'Please include a title, description, and deadline for the task',
    });
    return;
  }

  newTask.id = currentId++;
  tasks.push(newTask);
  res.status(201).json({ message: 'Task created', task: newTask });
};

export const updateTask = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) {
    next({ status: 404, message: 'No tasks found' });
    return;
  }

  const { title, description, deadline } = req.body;

  task.title = title || task.title;
  task.description = description || task.description;
  task.deadline = deadline || task.deadline;
  res.json({ message: 'Task updated', task });
};

export const deleteTask = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id) {
    next({ status: 400, message: 'Please provide a task id' });
    return;
  }
  const selectedTask = tasks.find((t) => t.id === parseInt(id));
  if (!selectedTask) {
    next({ status: 404, message: 'Task not found' });
    return;
  }
  tasks = tasks.filter((t) => t.id !== parseInt(id));
  res.json({ message: 'Task deleted' });
};
