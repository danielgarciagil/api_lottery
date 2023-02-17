import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

//Modulos Propios
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve todo lo que no está incluído en los DTOs
      //forbidNonWhitelisted: true, // Retorna bad request si hay propiedades en el objeto no requeridas
    }),
  );

  await app.listen(process.env.PORT || 3001, () => {
    console.log(
      `👍El server esta arriba en el puerto: ${process.env.PORT || 3001} 👍💪`,
    );
  });
}
bootstrap();
