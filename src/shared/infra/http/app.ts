import cors from 'cors';
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import 'express-async-errors';
import routes from '../http/routes/index';
const app = express();

app.use(cors({ origin: '*' }));

app.use(express.json() as RequestHandler);

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof Error) {
    return response.json({ message: err.message });
  }

  return response
    .status(500)
    .json({ message: 'Internal server error', status: 500 });
});

export { app };
