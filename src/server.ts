import { config } from 'dotenv';
import 'dotenv/config';
import 'reflect-metadata';
import { app } from './shared/infra/http/app';
import './shared/infra/http/container';
import { dataSource } from './shared/infra/typeorm';

config();

dataSource.initialize().then(() => {
  app.listen(process.env.PORT || 3333, () => {
    return console.log(`Server started on port ${process.env.PORT || 3333}.`);
  });
});
