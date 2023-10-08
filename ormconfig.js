module.exports = [
  {
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: Number(process.env.POSTGRESQL_PORT),
    username: 'postgres',
    password: process.env.POSTGRESQL_PASSWORD,
    database: process.env.NODE_ENV === 'test' ? 'test' : 'chameleon',
    synchronize: false,
    logging: false,
    migrationsTableName: 'migration',
    entities: ['src/**/**/infra/typeorm/entities/*.ts'],
    migrations: ['src/shared/infra/typeorm/migrations/*.ts'],
  },
];
