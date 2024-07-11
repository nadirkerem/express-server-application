"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = exports.users = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.users = [];
let currentUserId = 1;
// generateToken function...
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        next({ status: 400, message: 'Username and password are required' });
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = {
        id: currentUserId++,
        username,
        password: hashedPassword,
    };
    exports.users.push(newUser);
    res.json({ message: 'User registered' });
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        next({ status: 400, message: 'Username and password are required' });
        return;
    }
    const user = exports.users.find((u) => u.username === username);
    if (user && (yield bcrypt_1.default.compare(password, user.password))) {
        res.json({ message: 'User logged in' });
    }
    else {
        next({ status: 401, message: 'Invalid credentials' });
    }
});
exports.login = login;
