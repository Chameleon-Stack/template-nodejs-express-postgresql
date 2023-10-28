import 'reflect-metadata';
import 'express-async-errors';
import './container';
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import LibraryError from '../../errors/LibError';
import { router as routes } from './routes';
import swaggerDocumentation from './docs/swagger';

const app = express();

app.use(express.json() as RequestHandler);

app.use(routes);

swaggerDocumentation(app);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof LibraryError) {
      return response
        .status(error.statusCode)
        .json({ message: error.message, status: error.statusCode });
    }

    console.error(error);

    return response
      .status(500)
      .json({ message: 'Internal server error', status: 500 });
  },
);

export { app };
