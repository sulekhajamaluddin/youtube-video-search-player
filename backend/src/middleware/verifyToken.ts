import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET as string;

const verifyToken = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = String(req.headers.authorization);
    if (!token) {
      return res.status(401).send({ message: 'Access denied!!' });
    } else {
      jwt.verify(token, secret, (error) => {
        if (error) {
          return res.status(401).send({ message: 'Access Denied!!' });
        } else {
          next();
        }
      });
    }
  };
};

export default verifyToken;
