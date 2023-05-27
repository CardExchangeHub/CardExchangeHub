import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';
import { Client } from 'pg';

import cardRoute from './routes/card_route';

// import dotenv from 'dotenv';

// dotenv.config();

const app = express();

const port = 3000;

// const db = new Client(
//   'postgres://opwlobos:OqX_0FRKl6jbRTbtUdaRKZyx1x1ctHHI@drona.db.elephantsql.com/opwlobosg'
// );

// db.connect();
//
app.use('/auth');

app.use('/card', cardRoute);

const errorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);

  return res.status(errorObj.status).json({
    message: errorObj.message,
  });
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
