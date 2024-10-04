import { Request, Response, NextFunction } from 'express';
import { HTTPException } from './HTTPExceptions';

export const handleError = (
  method: (req: Request, res: Response, next: NextFunction) => any
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(method(req, res, next))
      .catch((error: any) => {
         if (error instanceof HTTPException) {
          res.status(error.statusCode).json({ error: error.message });
        } else if (error instanceof Error) {
          res.status(500).json({ error: error.message || 'Internal Server Error' });
        } else {
          res.status(500).json({ error: 'Something went wrong'});
        }
      });
  };
};