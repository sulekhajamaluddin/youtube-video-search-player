import { Request, Response } from "express";
import asyncWrapper from "../middleware/async";
import { Video } from "../models/video";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

interface resultItems {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  kind: string;
  snippet: {
    title: string;
  };
}

interface responseVideo {
  etag: string;
  kind: string;

  id: {
    kind: string;
    videoId: string;
    name: string;
  };
}

// Function to insert search videos into DB, if not already present in the DB

const insertIntoDB = async (item: resultItems) => {
  const dbVideos = await Video.query().where("name", item.snippet.title);
  if (dbVideos.length === 0) {
    await Video.query().insert({
      etag: item.etag,
      name: item.snippet.title,
      videoId: item.id.videoId,
      idkind: item.id.kind,
      kind: item.kind,
    });
  }
};

// If video with search word is in the DB, send it to user. Else get results from Youtube API and send to user

const searchVideo = asyncWrapper(
  async (req: Request, res: Response): Promise<Response> => {
    const { searchWord } = req.body;
    const videos = await Video.query().whereRaw("name ~* ?", [searchWord]);
    if (videos.length > 0) {
      return res.json(
        videos.map((item) => ({
          etag: item.etag,
          id: { kind: item.idkind, name: item.name, videoId: item.videoId },
          kind: item.kind,
        }))
      );
    } else {
      const response = await fetch(
        `${process.env.API_URL}&key=${process.env.API_KEY}&q=${searchWord}&maxResults=5`,
        {
          headers: {
            "User-Agent": "YOUTUBE API",
          },
        }
      );
      const apiResponse = await response.json();

      const responseArray = [];

      for (const item of apiResponse.items) {
        insertIntoDB(item);
        const newVideo: responseVideo = {
          etag: item.etag,
          kind: item.kind,
          id: {
            kind: item.id.kind,
            videoId: item.id.videoId,
            name: item.snippet.title,
          },
        };
        responseArray.push(newVideo);
      }
      return res.json(responseArray);
    }
  }
);

export { searchVideo };
