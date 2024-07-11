import { Request, Response, NextFunction } from 'express';

export const timeLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `Request received: ${req.method} ${req.url} at ${new Date().toISOString()}`
  );
  next();
};
