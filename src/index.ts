import 'reflect-metadata';
import express, { Express } from 'express';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import Router from './routes';
import connect from './utils/database';
import logger from './utils/logger';
import swaggerDocs from './utils/swagger';
import { Port } from './config/app.config';

const app: Express = express();

const allowedOrigins = ['http://example.com', 'http://127.0.0.1', 'http://::1', '*'];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Número máximo de solicitudes permitidas en el período
  handler: (req, res) => {
    res.status(429).json({ message: 'Too many requests, please try again later.' });
  },
});

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);

app.use('/api/v1', Router);

app.listen(Port, async () => {
  // * Produccion
  logger.info(`App is running at http://localhost:${Port}`);

  await connect();
  swaggerDocs(app, Port);
  // * Desarrollo
  // console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
