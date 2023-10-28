import 'reflect-metadata';
import './shared/infra/http/container';
import { config } from 'dotenv';
import 'dotenv/config';
import dataSource from './shared/infra/typeorm';
import { app } from './shared/infra/http/app';

config();

try {
  await dataSource.initialize();

  app.listen(process.env.PORT, () =>
    console.info(
      `Server started on http://localhost:${process.env.PORT} 🔥🔥🔥`,
    ),
  );
} catch (error) {
  console.error(error);
}
