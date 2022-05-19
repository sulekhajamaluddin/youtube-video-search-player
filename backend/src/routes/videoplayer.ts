import express from 'express';
import { getAllVideos } from '../controllers/videoplayer';
const router = express.Router();

router.route('/').get(getAllVideos);
export default router;
