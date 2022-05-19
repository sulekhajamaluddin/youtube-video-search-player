import { Request, Response } from 'express';
import asyncWrapper from '../middleware/async';
import { CurrentUser } from '../models/currentuser';
import { FavoriteVideo } from '../models/favoritevideo';
import { Video } from '../models/video';

// Get all favorite videos of a specific user from the database

const getAllFavoriteVideos = asyncWrapper(
  async (req: Request, res: Response): Promise<Response> => {
    const token = String(req.headers.authorization);
    const user = await CurrentUser.query().where('token', token);
    if (user) {
      const favoriteVideos = await FavoriteVideo.query().where(
        'user_id',
        user[0].user_id
      );
      if (favoriteVideos.length > 0) {
        const responseVideos = [];
        // for (let i = 0; i < favoriteVideos.length; i++) {
        for (const favoriteVideo of favoriteVideos) {
          const video = await Video.query().where('id', favoriteVideo.video_id);
          responseVideos.push(video[0]);
        }
        return res.json(
          responseVideos.map((video) => ({
            etag: video.etag,
            id: {
              kind: video.idkind,
              name: video.name,
              videoId: video.videoId,
            },
            kind: video.kind,
          }))
        );
      } else {
        return res.send({ message: 'No favorite videos' });
      }
    } else {
      return res
        .status(401)
        .send({ message: 'Not an authorised user!!. Login required' });
    }
  }
);

// Insert or Remove a favorite video from the DB based on users like/dislike

const handleFavorites = asyncWrapper(
  async (req: Request, res: Response): Promise<Response> => {
    const token = String(req.headers.authorization);
    const user = await CurrentUser.query().where('token', token);
    if (user) {
      const { video } = req.body;
      const videoDetails = await Video.query().where(
        'videoId',
        video.id.videoId
      );
      const id = videoDetails[0].id;

      const favVideos = await FavoriteVideo.query()
        .where('video_id', id)
        .where('user_id', user[0].user_id);
      if (favVideos.length > 0) {
        await FavoriteVideo.query()
          .delete()
          .where('video_id', id)
          .where('user_id', user[0].user_id);
      } else {
        await FavoriteVideo.query().insert({
          video_id: id,
          user_id: user[0].user_id,
        });
      }
      const favoriteVideos = await FavoriteVideo.query().where(
        'user_id',
        user[0].user_id
      );
      const responseVideos = [];
      for (let i = 0; i < favoriteVideos.length; i++) {
        const video = await Video.query().where(
          'id',
          favoriteVideos[i].video_id
        );
        responseVideos.push(video[0]);
      }
      return res.status(200).json(
        responseVideos.map((video) => ({
          etag: video.etag,
          id: { kind: video.idkind, name: video.name, videoId: video.videoId },
          kind: video.kind,
        }))
      );
    } else {
      return res
        .status(401)
        .send({ message: 'Not an authorised user!!. Login Required!' });
    }
  }
);

export { getAllFavoriteVideos, handleFavorites };
