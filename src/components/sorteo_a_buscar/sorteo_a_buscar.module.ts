import { Module } from '@nestjs/common';

//PROPIO
import { SorteoABuscarService } from './sorteo_a_buscar.service';
import { SorteoABuscarResolver } from './sorteo_a_buscar.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SorteoABuscar } from './entities/sorteo_a_buscar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SorteoABuscar])],
  providers: [SorteoABuscarResolver, SorteoABuscarService],
})
export class SorteoABuscarModule {}
