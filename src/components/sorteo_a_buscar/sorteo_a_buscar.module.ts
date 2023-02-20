import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//PROPIO
import { SorteoABuscarService } from './sorteo_a_buscar.service';
import { SorteoABuscarResolver } from './sorteo_a_buscar.resolver';
import { SorteoABuscar } from './entities/sorteo_a_buscar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SorteoABuscar])],
  providers: [SorteoABuscarResolver, SorteoABuscarService],
  exports: [SorteoABuscarService],
})
export class SorteoABuscarModule {}
