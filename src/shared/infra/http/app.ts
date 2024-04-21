import cors from 'cors';
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../../swagger.json';
import LibError from '../../errors/LibError';
import './container';
import { router as routes } from './routes';

const app = express();

app.use(cors());

app.use(express.json() as RequestHandler);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof LibError) {
      return response
        .status(err.statusCode)
        .json({ message: err.message, status: err.statusCode });
    }

    console.error(err);

    return response
      .status(500)
      .json({ message: 'Internal server error', status: 500 });
  },
);

export { app };
