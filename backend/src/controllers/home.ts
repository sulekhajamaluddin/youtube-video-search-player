import { Request, Response } from 'express';
import asyncWrapper from '../middleware/async';
import { User } from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Get secret for JWT from env

dotenv.config();
const secret = process.env.JWT_SECRET as string;

// Add user to the users table on Registration

const registerUser = asyncWrapper(
  async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const user = await User.query().where('email', email);
    if (user.length > 0) {
      return res.send({ message: 'User already exists!!!' });
    } else {
      try {
        await User.query().insert({
          email: email,
          password: password,
        });
        return res
          .status(200)
          .json({ status: 200, message: 'User added successfully' });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ message: err });
      }
    }
  }
);

// Authenticate user on Login and provide Token

const loginUser = asyncWrapper(
  async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    try {
      const responseUser = await User.query().findOne({ email });
      if (!responseUser) {
        return res.status(401).send({ message: 'User does not exist!!' });
      } else if (
        responseUser &&
        bcrypt.compareSync(password, responseUser.password)
      ) {
        const userID = responseUser.id;
        const userEmail = responseUser.email;
        const accessToken = jwt.sign(
          { userID: userID, email: userEmail },
          secret,
          {
            expiresIn: 60 * 60 * 3,
          }
        );
        return res.status(200).send({
          userID,
          userEmail,
          authToken: accessToken,
          authenticated: 'true',
          message: 'Successfully logged in',
        });
      } else {
        return res
          .status(401)
          .send({ message: 'Username or Password is not correct!!' });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send({ message: 'Something went wrong!!' });
    }
  }
);

export { registerUser, loginUser };
