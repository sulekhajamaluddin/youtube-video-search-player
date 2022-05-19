import express from 'express';
import {
  getCurrentUser,
  addCurrentUser,
  deleteCurrentUser,
} from '../controllers/currentuser';
const currentUserRouter = express.Router();

currentUserRouter
  .route('/')
  .get(getCurrentUser)
  .post(addCurrentUser)
  .delete(deleteCurrentUser);
export default currentUserRouter;
