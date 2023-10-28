import 'reflect-metadata';
import 'dotenv/config';

process.env.DATABASE_NAME = 'test';

const postgresDataSource = (await import('./src/shared/infra/typeorm')).default

beforeAll(async () => {
    await postgresDataSource.initialize();
    await postgresDataSource.runMigrations();
});

afterAll(async () => {
    await postgresDataSource.undoLastMigration();
    await postgresDataSource.destroy();
});
