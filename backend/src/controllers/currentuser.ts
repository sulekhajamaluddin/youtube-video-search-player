import { Request, Response } from 'express';
import { raw } from 'objection';
import asyncWrapper from '../middleware/async';
import { CurrentUser } from '../models/currentuser';
import { User } from '../models/user';

// Get details of current users who logged in less than 3 hours ago. Remove data corresponding to old tokens.

const getCurrentUser = asyncWrapper(
  async (req: Request, res: Response): Promise<Response> => {
    const users = await CurrentUser.query().where(
      'created_at',
      '<',
      raw("now() - (? * '1 HOUR':: INTERVAL)", [3])
    );
    if (users) {
      for (const user of users) {
        await CurrentUser.query().delete().where('token', user.token);
      }
    }
    const token = String(req.headers.authorization);
    const response = await CurrentUser.query().where('token', token);
    const currentUser = response[0];
    if (currentUser) {
      const currentUserDetails = await User.query()
        .select('id', 'email')
        .where('id', currentUser.user_id);
      return res.status(200).send(currentUserDetails[0]);
    } else {
      return res
        .status(401)
        .send({ message: 'Not an authorised User. Login required' });
    }
  }
);

// Insert current user in the database on Login

const addCurrentUser = asyncWrapper(
  async (req: Request, res: Response): Promise<Response> => {
    const token = String(req.headers.authorization);
    const { userId } = req.body;
    await CurrentUser.query().insert({
      user_id: userId,
      token: token,
    });
    return res.status(201).send('Current User Added Successfully');
  }
);

// Delete current user from database on Logout

const deleteCurrentUser = asyncWrapper(
  async (req: Request, res: Response): Promise<Response> => {
    const token = String(req.headers.authorization);
    await CurrentUser.query().delete().where('token', token);
    return res.status(200).send('Succesfully removed current user');
  }
);

// const removeOldUsers = asyncWrapper(
//   async (req: Request, res: Response): Promise<Response> => {
//       const users = await CurrentUser.query().where('created_at', '<', raw('now() - (? * \'1 HOUR\':: INTERVAL)', [5]));
//     if (users) {
//       for (const user of users){
//         await CurrentUser.query().delete().where('token', user.token);
//       }
//       return res.status(200);
//     } else {
//       return res.send({ message: 'Not authorised' });
//     }
//   }
// );

export { getCurrentUser, addCurrentUser, deleteCurrentUser };
