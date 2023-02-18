import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

// Modulos Propios
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config, enviroments, validationENV } from '../config/config';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { CommonModule } from '../common/common.module';
import {
  UsersModule,
  RoleModule,
  LoteriaModule,
  JuegoModule,
  SorteoModule,
  ResultadosModule,
  CronModule,
  XpathModule,
  WebScrapingModule,
  SorteoDiasModule,
  DiasModule,
  SorteoABuscarModule,
} from './../components';
import { AppInit } from './app-init.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.STATE] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: validationENV(),
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault],
    }),

    //Componentes de Auth
    AuthModule,

    //Base de Datos
    DatabaseModule,

    //Compoenntes de User
    UsersModule,
    RoleModule,

    //Componentes Propio
    CommonModule,
    LoteriaModule,
    JuegoModule,
    ResultadosModule,
    XpathModule,
    WebScrapingModule,
    DiasModule,
    SorteoModule,
    SorteoDiasModule,
    SorteoABuscarModule,

    //AUTOMATICO
    CronModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppInit],
})
export class AppModule {}
