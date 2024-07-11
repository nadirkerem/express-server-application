import express, { Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import tasksRoutes from './routes/tasks';
import usersRoutes from './routes/users';
import commentsRoutes from './routes/comments';

import errorHandler from './middleware/error-handler';
import { timeLogger } from './middleware/time-logger';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(timeLogger);
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/comments', commentsRoutes);

app.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Task Management System' });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
