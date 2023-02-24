import { Module } from '@nestjs/common';
import { ResponseSorteoABuscarService } from './response_sorteo_a_buscar.service';
import { ResponseSorteoABuscarResolver } from './response_sorteo_a_buscar.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseSorteoABuscar } from './entities/response_sorteo_a_buscar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResponseSorteoABuscar])],
  providers: [ResponseSorteoABuscarResolver, ResponseSorteoABuscarService],
  exports: [ResponseSorteoABuscarService],
})
export class ResponseSorteoABuscarModule {}
