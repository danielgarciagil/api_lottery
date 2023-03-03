import { Module } from '@nestjs/common';

//PROPIO

import { XpathModule } from './../xpath/xpath.module';
import { SorteoABuscarModule } from '../sorteo_a_buscar/sorteo_a_buscar.module';
import { WebScrapingXpathService } from './WebScrapingXpath.service';
import { ResultadosModule } from '../resultados/resultados.module';
import { ResponseSorteoABuscarModule } from '../response_sorteo_a_buscar/response_sorteo_a_buscar.module';
import { ProcesoDeSorteoABuscarResolver } from './generar-automaticos.resolver';
import { ResultadosSorteoService } from './resultados-sorteo.service';

@Module({
  imports: [
    XpathModule,
    SorteoABuscarModule,
    ResultadosModule,
    ResponseSorteoABuscarModule,
  ],
  providers: [
    WebScrapingXpathService,
    ResultadosSorteoService,
    ProcesoDeSorteoABuscarResolver,
  ],
  exports: [WebScrapingXpathService, ResultadosSorteoService],
})
export class WebScrapingModule {}
