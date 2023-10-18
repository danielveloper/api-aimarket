import { DataSource } from 'typeorm';
import { DatabaseConfig } from '../config/app.config';
import logger from './logger';

export const dataSource = new DataSource({
  type: 'postgres',
  host: DatabaseConfig.host,
  port: DatabaseConfig.port,
  username: DatabaseConfig.username,
  password: DatabaseConfig.password,
  database: DatabaseConfig.database,
  entities: ['./src/entities/*.ts'],
  logging: false,
  synchronize: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

async function connect() {
  try {
    await dataSource.initialize();
    logger.info('DB connected');
  } catch (error) {
    const err: Error = error as Error;
    logger.error(err.message);
    logger.error('Could not connect to db');
    process.exit(1);
  }
}

export default connect;
