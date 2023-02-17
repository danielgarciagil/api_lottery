import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//PROPIO
import { SorteoService } from './sorteo.service';
import { SorteoResolver } from './sorteo.resolver';
import { Sorteo } from './entities/sorteo.entity';
import { Dias } from './entities/dias.entity';
import { DiaInit } from './dia-init.service';
import { SorteoABuscar } from './entities/sorteo_a_buscar.entity';
import { SorteoDias } from './entities/sorteo_dias.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sorteo, Dias, SorteoABuscar, SorteoDias]),
  ],
  providers: [SorteoResolver, SorteoService, DiaInit],
  exports: [SorteoService],
})
export class SorteoModule {}
