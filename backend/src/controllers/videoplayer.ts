import { Request, Response } from 'express';
import asyncWrapper from '../middleware/async';
import { Video } from '../models/video';

// Get all the Videos (Common to all Users)

const getAllVideos = asyncWrapper(
  async (req: Request, res: Response): Promise<Response> => {
    const {pageNumber} = req.query;
    const limit = 5*Number(pageNumber);
    // const skip = ((Number(pageNumber))-1)*limit
    const responseVideos = await Video.query().limit(limit);

    return res.json(
      responseVideos.map((video) => ({
        etag: video.etag,
        id: { kind: video.idkind, name: video.name, videoId: video.videoId },
        kind: video.kind,
      }))
    );
  }
);

export { getAllVideos };
