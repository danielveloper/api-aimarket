import { DataSource } from 'typeorm';
import { DatabaseConfig } from '../config/app.config';
import { User } from '../entities/user';
import { Person } from '../entities/person';
import { Product } from '../entities/product';
import logger from './logger';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DatabaseConfig.host,
  port: DatabaseConfig.port,
  username: DatabaseConfig.username,
  password: DatabaseConfig.password,
  database: DatabaseConfig.database,
  entities: [User, Person, Product],
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
    await AppDataSource.initialize();
    logger.info('DB connected');
  } catch (error) {
    const err: Error = error as Error;
    logger.error(err.message);
    logger.error('Could not connect to db');
    process.exit(1);
  }
}

export default connect;
