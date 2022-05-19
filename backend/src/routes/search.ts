import express from 'express';
import { searchVideo } from '../controllers/search';
const searchRouter = express.Router();

searchRouter.route('/').post(searchVideo);
export default searchRouter;
