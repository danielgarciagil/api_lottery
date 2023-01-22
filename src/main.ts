import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

//Modulos Propios
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve todo lo que no está incluído en los DTOs
      forbidNonWhitelisted: true, // Retorna bad request si hay propiedades en el objeto no requeridas
    }),
  );

  await app.listen(3000);
}
bootstrap();
