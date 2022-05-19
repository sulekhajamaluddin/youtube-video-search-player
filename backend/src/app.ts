import express, { Application } from 'express';
import route from './routes/videoplayer';
import searchRouter from './routes/search';
import favoritesRouter from './routes/favorites';
import homeRouter from './routes/home';
import currentUserRouter from './routes/currentuser';
import cors from 'cors';
import setUpDB from './db/connect';
import dotenv from 'dotenv';
import verifyToken from './middleware/verifyToken';

dotenv.config();

// Set up Server

function setUpServer() {
  const app: Application = express();

  const corsOptions = {
    origin: process.env.LOCALHOST,
    optionsSuccessStatus: 200,
    credentials: true,
  };
  app.use(cors(corsOptions));

  //Set up DB
  setUpDB();

  //Middleware
  app.use(express.json());

  //Routes
  app.use('/api/v1/videoplayer', route);
  app.use('/api/v1/search', searchRouter);
  app.use('/api/v1/favorites', verifyToken(), favoritesRouter);
  app.use('/api/v1/home', homeRouter);
  app.use('/api/v1/currentuser', verifyToken(), currentUserRouter);
  return app;
}

export default setUpServer;
