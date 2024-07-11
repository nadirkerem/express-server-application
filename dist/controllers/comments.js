"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.addComment = exports.getCommentsByTaskId = void 0;
let comments = [];
let currentCommentId = 1;
const getCommentsByTaskId = (req, res, next) => {
    const { taskId } = req.params;
    const taskComments = comments.filter((c) => c.taskId === parseInt(taskId));
    if (taskComments.length === 0) {
        next({ status: 404, message: 'Comments not found' });
        return;
    }
    res.json(taskComments);
};
exports.getCommentsByTaskId = getCommentsByTaskId;
const addComment = (req, res, next) => {
    const { taskId, userId, content } = req.body;
    if (!taskId || !userId || !content) {
        next({
            status: 400,
            message: 'Task ID, user ID, and content are required',
        });
        return;
    }
    const newComment = {
        id: currentCommentId++,
        taskId: parseInt(taskId),
        userId: parseInt(userId),
        content,
        createdAt: new Date(),
    };
    comments.push(newComment);
    res.json({ message: 'Comment added', comment: newComment });
};
exports.addComment = addComment;
const updateComment = (req, res, next) => {
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
exports.updateComment = updateComment;
const deleteComment = (req, res, next) => {
    const { id } = req.params;
    const index = comments.findIndex((c) => c.id === parseInt(id));
    if (index === -1) {
        next({ status: 404, message: 'Comment not found' });
        return;
    }
    comments.splice(index, 1);
    res.json({ message: 'Comment deleted' });
};
exports.deleteComment = deleteComment;
