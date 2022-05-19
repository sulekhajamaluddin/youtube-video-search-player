import express from 'express';
import { getAllFavoriteVideos, handleFavorites } from '../controllers/favorite';
const favoritesRouter = express.Router();

favoritesRouter.route('/').get(getAllFavoriteVideos).post(handleFavorites);
export default favoritesRouter;
