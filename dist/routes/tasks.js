"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_1 = require("../controllers/tasks");
const router = (0, express_1.Router)();
router.get('/', tasks_1.getTasks);
router.get('/new', tasks_1.getTaskForm);
router.get('/:id', tasks_1.getTaskById);
router.get('/user/:user_id', tasks_1.getTasksByUserId);
router.post('/', tasks_1.createTask);
router.put('/:id', tasks_1.updateTask);
router.delete('/:id', tasks_1.deleteTask);
exports.default = router;