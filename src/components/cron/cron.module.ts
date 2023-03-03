import { Module } from '@nestjs/common';

//Propio
import { CronServiceInit } from './cron-init.service';
import { CronService } from './cron.service';
import { WebScrapingModule } from '../web-scraping/web-scraping.module';
import { SorteoABuscarModule } from '../sorteo_a_buscar/sorteo_a_buscar.module';
import { ResponseSorteoABuscarModule } from '../response_sorteo_a_buscar/response_sorteo_a_buscar.module';
import { LotenetPremiosModule } from '../lotenet-premios/lotenet-premios.module';
import { PremiosAutomaticoLotenetModule } from '../premios-automatico-lotenet/premios-automatico-lotenet.module';
import { ResponseLotenetPremioModule } from '../response-lotenet-premio/response-lotenet-premio.module';

@Module({
  imports: [
    SorteoABuscarModule,
    WebScrapingModule,
    ResponseSorteoABuscarModule,
    ResponseLotenetPremioModule,
    LotenetPremiosModule,
    PremiosAutomaticoLotenetModule,
  ],
  providers: [CronServiceInit, CronService],
})
export class CronModule {}
