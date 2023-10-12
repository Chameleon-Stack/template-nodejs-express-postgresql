import '@shared/infra/http/container';
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../../swagger.json';
import { router as routes } from './routes';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json() as RequestHandler);

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.log(err);

  return response
    .status(500)
    .json({ message: 'Internal server error!', status: 500 });
});

export { app };
