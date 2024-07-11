import { Request, Response, NextFunction } from 'express';
import { Comment } from '../interfaces/comment';

let comments: Comment[] = [];
let currentCommentId = 1;

export const getCommentsByTaskId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { taskId } = req.params;
  const taskComments = comments.filter((c) => c.taskId === parseInt(taskId));

  if (taskComments.length === 0) {
    next({ status: 404, message: 'Comments not found' });
    return;
  }
  res.json(taskComments);
};

export const addComment = (req: Request, res: Response, next: NextFunction) => {
  const { taskId, userId, content } = req.body;
  if (!taskId || !userId || !content) {
    next({
      status: 400,
      message: 'Task ID, user ID, and content are required',
    });
    return;
  }

  const newComment: Comment = {
    id: currentCommentId++,
    taskId: parseInt(taskId),
    userId: parseInt(userId),
    content,
    createdAt: new Date(),
  };
  comments.push(newComment);
  res.json({ message: 'Comment added', comment: newComment });
};

export const updateComment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { content } = req.body;
  if (!content) {
    next({ status: 400, message: 'Content is required' });
    return;
  }

  const comment = comments.find((c) => c.id === parseInt(id));
  if (!comment) {
    next({ status: 404, message: 'Comment not found' });
    return;
  }

  comment.content = content;
  res.json({ message: 'Comment updated', comment });
};

export const deleteComment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const index = comments.findIndex((c) => c.id === parseInt(id));
  if (index === -1) {
    next({ status: 404, message: 'Comment not found' });
    return;
  }

  comments.splice(index, 1);
  res.json({ message: 'Comment deleted' });
};
