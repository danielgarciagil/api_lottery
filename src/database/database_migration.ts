import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

const database_migrations = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  database: configService.get('DB_NAME'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  synchronize: false,
  logging: true,
  entities: ['src/components/**/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
});

export default database_migrations;
