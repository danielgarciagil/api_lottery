import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//PROPIO
import { JuegoService } from './juego.service';
import { JuegoResolver } from './juego.resolver';
import { Juego } from './entities/juego.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Juego])],
  providers: [JuegoResolver, JuegoService],
  exports: [JuegoService],
})
export class JuegoModule {}
