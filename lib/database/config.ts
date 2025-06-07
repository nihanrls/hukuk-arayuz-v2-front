import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Blog } from './entities/Blog';
import { About } from './entities/About';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [Blog, About],
  migrations: ['lib/database/migrations/*.ts'],
  subscribers: ['lib/database/subscribers/*.ts'],
});

let isInitialized = false;

export const initializeDatabase = async () => {
  if (!isInitialized) {
    try {
      await AppDataSource.initialize();
      isInitialized = true;
      console.log('Database connection initialized');
    } catch (error) {
      console.error('Error during Data Source initialization:', error);
      throw error;
    }
  }
  return AppDataSource;
}; 