import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

//PROPIO
import { config } from '../config/config';
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          type: 'postgres',
          host: configService.POSTGRES.DB_HOST,
          port: configService.POSTGRES.DB_PORT,
          database: configService.POSTGRES.DB_NAME,
          username: configService.POSTGRES.DB_USER,
          password: configService.POSTGRES.DB_PASSWORD,
          autoLoadEntities: true,
        } as DataSourceOptions;
      },
    }),
  ],
})
export class DatabaseModule {}
