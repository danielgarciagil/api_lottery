import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

// Modulos Propios
import { HelloWordModule } from './components/hello-word/hello-word.module';
import { TodoModule } from './components/todo/todo.module';
import { ItemsModule } from './components/items/items.module';
import { config, enviroments, validationENV } from './config/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './components/users/users.module';
import { AuthModule } from './auth/auth.module';
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

    DatabaseModule,

    //! Estos dos modulos eran de pruebas
    // HelloWordModule,
    // TodoModule,
    ItemsModule,

    UsersModule,

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
