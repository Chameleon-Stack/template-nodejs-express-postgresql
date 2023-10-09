import 'reflect-metadata';
import { app } from '@shared/infra/http/app';
import '@shared/infra/http/container';
import { dataSource } from '@shared/infra/typeorm';
import { config } from 'dotenv';
import 'dotenv/config';

config();

dataSource.initialize().then(() => {
  app.listen(3333, () => {
    return console.log('Server started on port 3333.');
  });
});
