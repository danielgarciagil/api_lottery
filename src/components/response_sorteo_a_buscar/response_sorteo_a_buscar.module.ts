import { Module } from '@nestjs/common';
import { ResponseSorteoABuscarService } from './response_sorteo_a_buscar.service';
import { ResponseSorteoABuscarResolver } from './response_sorteo_a_buscar.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ResponseSorteoABuscarModule])],
  providers: [ResponseSorteoABuscarResolver, ResponseSorteoABuscarService],
  exports: [ResponseSorteoABuscarService],
})
export class ResponseSorteoABuscarModule {}
