import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { config } from './../../config/config';
import { ConfigType } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) =>
        ({
          type: 'postgres',
          host: configService.POSTGRES.DB_HOST,
          port: configService.POSTGRES.DB_PORT,
          database: configService.POSTGRES.DB_NAME,
          username: configService.POSTGRES.DB_USER,
          password: configService.POSTGRES.DB_PASSWORD,
          //autoLoadEntities: true,
        } as DataSourceOptions),
    }),
  ],
})
export class DatabaseModule {}
