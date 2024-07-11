import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../interfaces/custom-error';

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
};

export default errorHandler;
