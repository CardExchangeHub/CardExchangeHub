import express, {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
  urlencoded,
} from 'express';

import cardRoute from './routes/card_route.mjs';
import authRoute from './routes/auth_route.mjs';

const app = express();

const port = 3000;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get('/', (_req: Request, res: Response, next: NextFunction) => {
  res.send('hello');
  next();
});
app.use('/auth', authRoute);

app.use('/card', cardRoute);

const errorHandler: ErrorRequestHandler = (
  err: Error,
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
  // eslint-disable-next-line no-console
  console.log(errorObj.log);

  return res.status(errorObj.status).json({
    message: errorObj.message,
  });
};

app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
