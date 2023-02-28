import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

// Modulos Propios
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config, validationENV } from '../config/config';
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
  ResponseSorteoABuscarModule,
  PasarDataModule,
  LotenetPremiosModule,
  PlataformaModule,
  ResponseLotenetPremioModule,
} from './../components';
import { AppInit } from './app-init.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV || 'DEV'}`],
      load: [config],
      isGlobal: true,
      validationSchema: validationENV(),
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      //todo una vez en producion queitar de aqui y revisar comos eria la forma correcta
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
    DiasModule,
    SorteoModule,
    SorteoDiasModule,
    SorteoABuscarModule,
    ResponseSorteoABuscarModule,
    WebScrapingModule,
    PasarDataModule,
    LotenetPremiosModule,
    PlataformaModule,
    ResponseLotenetPremioModule,

    //AUTOMATICO
    CronModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppInit],
})
export class AppModule {}
