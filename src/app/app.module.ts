import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';

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
  //PasarDataModule,
  LotenetPremiosModule,
  PlataformaModule,
  ResponseLotenetPremioModule,
  PremiosDiasModule,
  PremiosAutomaticoLotenetModule,
  TelegramModule,
  InstagramModule,
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

    //GraphQLModule.forRoot<ApolloDriverConfig>({
    //  driver: ApolloDriver,
    //  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //  playground: false,
    //  plugins: [ApolloServerPluginLandingPageLocalDefault],
    //  //cacheControl: true, // Habilita la caché de consultas
    //}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false, // Deshabilita la consola de GraphQL Playground en producción
      plugins: [ApolloServerPluginLandingPageProductionDefault], // Utiliza el plugin de landing page de Apollo para producción
      //cacheControl: {
      //  defaultMaxAge: 600, // Establece el tiempo de caché predeterminado en 10 minutos
      //},
      context: ({ req }) => ({ req }), // Configura el contexto con la solicitud HTTP
      debug: false, // Deshabilita el modo de depuración en producción
      introspection: false, // Deshabilita la introspección en producción
      //tracing: false, // Deshabilita el seguimiento en producción
      cors: {
        origin: '*', // Configura el origen de la solicitud permitido en producción
        credentials: true, // Habilita el intercambio de cookies en producción
      },
      // Configurar la autenticación y autorización según sea necesario para la aplicación en producción
    }),
    //todo una vez en producion queitar de aqui y revisar comos eria la forma correcta

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
    //!WebScrapingModule,
    //PasarDataModule,
    //!TelegramModule,
    LotenetPremiosModule,
    PlataformaModule,
    ResponseLotenetPremioModule,
    PremiosDiasModule,
    //!PremiosAutomaticoLotenetModule,
    //!InstagramModule,

    //AUTOMATICO
    //!CronModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppInit],
})
export class AppModule {}
