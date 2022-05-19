import express, { NextFunction, Request, Response } from 'express';
const asyncWrapper = (
  fn: (
    arg0: express.Request,
    arg1: express.Response,
    arg2: express.NextFunction
  ) => Promise<Response>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default asyncWrapper;
