import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({ errors: err.issues });
  }
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
}