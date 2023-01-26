import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { JwtService } from '@nestjs/jwt';

// Modulos Propios
import { HelloWordModule } from './components/hello-word/hello-word.module';
import { TodoModule } from './components/todo/todo.module';
import { ItemsModule } from './components/items/items.module';
import { config, enviroments, validationENV } from './config/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './components/users/users.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.STATE] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: validationENV(),
    }),

    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [AuthModule],
      inject: [JwtService],
      useFactory: async (jwtService: JwtService) => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          playground: false,
          plugins: [ApolloServerPluginLandingPageLocalDefault],
          context({ req }) {
            //Con esto el esquema de Grpahq Ql no me cargara las rutas si no mando un token Valid
            //! Loquitare poara fines de prueba
            //const token = req.headers.authorization?.replace('Bearer ', ''); //Aqui obtengo el codigo que me viene
            //if (!token) {
            //  console.log('Token Need');
            //  throw Error('Token Need');
            //}
            //const payload = jwtService.decode(token);
            //
            //if (!payload) {
            //  console.log('Token no valid');
            //  throw Error('Token not valid');
            //}
          },
        };
      },
    }),

    // TODO: configuracion basica de GraphQl
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   playground: false,
    //   plugins: [ApolloServerPluginLandingPageLocalDefault],
    // }),

    DatabaseModule,

    //! Estos dos modulos eran de pruebas
    // HelloWordModule,
    TodoModule,
    ItemsModule,

    UsersModule,

    AuthModule,

    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
