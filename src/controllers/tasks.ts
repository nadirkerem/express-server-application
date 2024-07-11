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

  let filteredTasks = tasks;

  const { title, description, deadline } = req.query;

  if (title) {
    filteredTasks = filteredTasks.filter((t) =>
      t.title.includes(title.toString())
    );
  }

  if (description) {
    filteredTasks = filteredTasks.filter((t) =>
      t.description.includes(description.toString())
    );
  }

  if (deadline) {
    filteredTasks = filteredTasks.filter((t) => t.deadline === deadline);
  }

  res.json(filteredTasks);
};

export const getTasksById = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === parseInt(id));
  if (!task) {
    next({ status: 404, message: 'Task not found' });
    return;
  }
  res.json(task);
};

export const getTasksByUserId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { userId } = req.params;
  const userTasks = tasks.filter((t) => t.userId === parseInt(userId));
  if (userTasks.length === 0) {
    next({ status: 404, message: 'No tasks found' });
    return;
  }
  res.json(userTasks);
};

// TODO: with userId
export const createTask = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let newTask: Task = req.body;

  if (
    !newTask.userId ||
    !newTask.title ||
    !newTask.description ||
    !newTask.deadline
  ) {
    next({
      status: 400,
      message:
        'Please include a user ID, title, description, and deadline for the task',
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

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.deadline = req.body.deadline || task.deadline;
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
