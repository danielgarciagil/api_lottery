import { Module } from '@nestjs/common';

//PROPIO

import { XpathModule } from './../xpath/xpath.module';
import { SorteoABuscarModule } from '../sorteo_a_buscar/sorteo_a_buscar.module';
import { ProcesoDeSorteoABuscarResolver } from './generar-automaticos.resolver';

import { WebScrapingXpathService } from './WebScrapingXpath.service';
import { ResultadosModule } from '../resultados/resultados.module';
import { GenerarResultadosService } from './generar-resultados.service';
import { ResponseSorteoABuscarModule } from '../response_sorteo_a_buscar/response_sorteo_a_buscar.module';
import { BuscarAutomaticoService } from './buscar-automatico.service';

@Module({
  imports: [
    XpathModule,
    SorteoABuscarModule,
    ResultadosModule,
    ResponseSorteoABuscarModule,
  ],
  providers: [
    ProcesoDeSorteoABuscarResolver,
    WebScrapingXpathService,
    GenerarResultadosService,
    BuscarAutomaticoService,
  ],
  exports: [GenerarResultadosService],
})
export class WebScrapingModule {}
