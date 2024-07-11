"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const router = (0, express_1.Router)();
router.get('/:id', users_1.getUserById);
router.get('/', users_1.getAllUsers);
exports.default = router;
