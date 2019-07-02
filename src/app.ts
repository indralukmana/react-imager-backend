import express, {
  Application,
  Request,
  Response,
  NextFunction,
} from 'express';

import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bluebird from 'bluebird';
import config from './config';
import http from 'http';
import cors from 'cors';
import ImageRouter from './router';

mongoose.Promise = bluebird;
const mongoUrl = process.env.mongoUrl
  ? process.env.mongoUrl
  : config.mongoUrl;


const port = 5555;

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/image', ImageRouter);

// error handler
app.use(
  (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error =
      req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  }
);

const server = http.createServer(app);
server.listen(port);
server.on('listening', async () => {
  console.info(`Listening on port ${port}`);
  mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useFindAndModify: false
  });
  mongoose.connection.on('open', () => {
    console.info('Connected to Mongo.');
  });
  mongoose.connection.on('error', (err: any) => {
    console.error(err);
  });
});
