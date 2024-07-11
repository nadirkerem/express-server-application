"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getUserById = void 0;
const auth_1 = require("../controllers/auth");
const getUserById = (req, res, next) => {
    const { id } = req.params;
    const user = auth_1.users.find((u) => u.id === parseInt(id));
    if (!user) {
        next({ status: 404, message: 'User not found' });
        return;
    }
    res.json({ user });
};
exports.getUserById = getUserById;
const getAllUsers = (req, res, next) => {
    if (auth_1.users.length === 0) {
        next({ status: 404, message: 'No users found' });
        return;
    }
    res.json({ users: auth_1.users });
};
exports.getAllUsers = getAllUsers;
