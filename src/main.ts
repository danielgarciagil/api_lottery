import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as path from 'path';
//import { ValidationPipe } from '@nestjs/common';

//Modulos Propios
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.useGlobalPipes(
  //  new ValidationPipe({
  //    whitelist: true, // Remueve todo lo que no está incluído en los DTOs
  //    //forbidNonWhitelisted: true, // Retorna bad request si hay propiedades en el objeto no requeridas
  //  }),
  //);
  //app.useGlobalInterceptors(new GraphqlResponseInterceptor());

  // Configurar Express para servir archivos estáticos
  app.use(express.static(path.join(__dirname, '../public')));

  await app.listen(process.env.PORT || 9999, () => {
    console.log(
      `👍El server esta arriba en el puerto: ${process.env.PORT || 9999} 👍💪`,
    );
  });
}
bootstrap();
