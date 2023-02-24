import { Module } from '@nestjs/common';
import { ResponseSorteoABuscarService } from './response_sorteo_a_buscar.service';
import { ResponseSorteoABuscarResolver } from './response_sorteo_a_buscar.resolver';

@Module({
  providers: [ResponseSorteoABuscarResolver, ResponseSorteoABuscarService]
})
export class ResponseSorteoABuscarModule {}
