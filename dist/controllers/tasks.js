"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasksByUserId = exports.getTaskById = exports.getTaskForm = exports.getTasks = void 0;
let tasks = [];
let currentId = 1;
const getTasks = (req, res, next) => {
    if (tasks.length === 0) {
        res.render('tasks', {
            tasks: null,
            task: null,
            message: 'Tasks not found',
        });
        return;
    }
    let filteredTasks = tasks;
    const { title, description, deadline } = req.query;
    if (title) {
        filteredTasks = filteredTasks.filter((t) => t.title.includes(title.toString()));
    }
    if (description) {
        filteredTasks = filteredTasks.filter((t) => t.description.includes(description.toString()));
    }
    if (deadline) {
        filteredTasks = filteredTasks.filter((t) => t.deadline === deadline);
    }
    // res.json(filteredTasks);
    res.render('tasks', { tasks: filteredTasks, task: null });
};
exports.getTasks = getTasks;
const getTaskForm = (req, res, next) => {
    res.render('task-form');
};
exports.getTaskForm = getTaskForm;
const getTaskById = (req, res, next) => {
    const { id } = req.params;
    const task = tasks.find((t) => t.id === parseInt(id));
    if (!task) {
        next({ status: 404, message: 'Task not found' });
        return;
    }
    res.json(task);
};
exports.getTaskById = getTaskById;
const getTasksByUserId = (req, res, next) => {
    const { userId } = req.params;
    const userTasks = tasks.filter((t) => t.userId === parseInt(userId));
    if (userTasks.length === 0) {
        next({ status: 404, message: 'No tasks found' });
        return;
    }
    res.json(userTasks);
};
exports.getTasksByUserId = getTasksByUserId;
const createTask = (req, res, next) => {
    let newTask = req.body;
    if (!newTask.userId ||
        !newTask.title ||
        !newTask.description ||
        !newTask.deadline) {
        next({
            status: 400,
            message: 'Please include a user ID, title, description, and deadline for the task',
        });
        return;
    }
    newTask.id = currentId++;
    tasks.push(newTask);
    res.status(201).redirect('/api/tasks');
};
exports.createTask = createTask;
const updateTask = (req, res, next) => {
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
exports.updateTask = updateTask;
const deleteTask = (req, res, next) => {
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
exports.deleteTask = deleteTask;
