import { Module } from '@nestjs/common';
import { SorteoDiasService } from './sorteo_dias.service';
import { SorteoDiasResolver } from './sorteo_dias.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SorteoDias } from './entities/sorteo_dia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SorteoDias])],
  providers: [SorteoDiasResolver, SorteoDiasService],
})
export class SorteoDiasModule {}
