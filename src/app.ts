import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { NextFunction } from 'connect';
import router from './app/routes';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

// cors
app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with the actual frontend URL
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use('/api/v1', router);

// global error handler
app.use(globalErrorHandler);

// handle route not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'route Not found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'route not found',
      },
    ],
  });
  next();
});

export default app;
