import 'dotenv/config';
import { DataSource } from 'typeorm';

const dataSourceTest = new DataSource({
  type: 'postgres',
  url: process.env.POSTGRESQL_URI_TEST,
  entities: ['src/**/**/infra/typeorm/entities/*.ts'],
  migrations: ['src/shared/infra/typeorm/migrations/*.ts'],
});

export default dataSourceTest;
