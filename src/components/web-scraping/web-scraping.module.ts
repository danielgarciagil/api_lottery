import { Module } from '@nestjs/common';

//PROPIO

import { XpathModule } from './../xpath/xpath.module';
import { SorteoABuscarModule } from '../sorteo_a_buscar/sorteo_a_buscar.module';
import { ProcesoDeSorteoABuscarResolver } from './proceso_de_sorteo_a_buscar.resolver';
import { ProcesoDeSorteoBuscarService } from './proceso_de_sorteo_a_buscar.service';
import { WebScrapingXpathService } from './WebScrapingXpath.service';
import { ResultadosModule } from '../resultados/resultados.module';

@Module({
  imports: [XpathModule, SorteoABuscarModule, ResultadosModule],
  providers: [
    ProcesoDeSorteoABuscarResolver,
    ProcesoDeSorteoBuscarService,
    WebScrapingXpathService,
  ],
  exports: [ProcesoDeSorteoBuscarService],
})
export class WebScrapingModule {}
