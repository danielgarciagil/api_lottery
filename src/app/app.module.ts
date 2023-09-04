import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';

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
  LotenetPremiosModule,
  PlataformaModule,
  ResponseLotenetPremioModule,
  PremiosDiasModule,
  PremiosAutomaticoLotenetModule,
  TelegramModule,
  LotenetApiModule,
} from './../components';
import { AppInit } from './app-init.service';

const isProduction = process.env.STATE === 'PROD';
console.log(isProduction);

const apolloPlugin = isProduction
  ? ApolloServerPluginLandingPageProductionDefault
  : ApolloServerPluginLandingPageLocalDefault;

const baseImports = [
  ConfigModule.forRoot({
    envFilePath: [`.env.${process.env.STATE || 'DEV'}`],
    load: [config],
    isGlobal: true,
    validationSchema: validationENV(),
  }),

  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    playground: false, // Deshabilita la consola de GraphQL Playground en producción
    plugins: [apolloPlugin()], // Utiliza el plugin de landing page de Apollo para producción
    context: ({ req }) => ({ req }), // Configura el contexto con la solicitud HTTP
    introspection: isProduction ? false : true, // Deshabilita la introspección en producción
    persistedQueries: false,
    fieldResolverEnhancers: ['interceptors'],
    //cors: {
    //  origin: '*', // Configura el origen de la solicitud permitido en producción
    //  credentials: true, // Habilita el intercambio de cookies en producción
    //},
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
  LotenetPremiosModule,
  PlataformaModule,
  ResponseLotenetPremioModule,
  PremiosDiasModule,
  LotenetApiModule,
  CronModule,
  WebScrapingModule,
  PremiosAutomaticoLotenetModule,
  TelegramModule,
];

//TODO Solo si estoy en produccion agrego estos modulos
//isProduction ? null : baseImports.push(TelegramModule);

@Module({
  providers: [AppService, AppInit],
  imports: baseImports,
  controllers: [AppController],
})
export class AppModule {}
