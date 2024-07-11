"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const users_1 = __importDefault(require("./routes/users"));
const comments_1 = __importDefault(require("./routes/comments"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const time_logger_1 = require("./middleware/time-logger");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(time_logger_1.timeLogger);
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/api/auth', auth_1.default);
app.use('/api/tasks', tasks_1.default);
app.use('/api/users', users_1.default);
app.use('/api/comments', comments_1.default);
app.get('/', (req, res) => {
    res.render('index', { title: 'Task Management System' });
});
app.use(error_handler_1.default);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
