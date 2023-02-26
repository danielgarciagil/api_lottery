import { Module } from '@nestjs/common';

//Propio
import { CronServiceInit } from './cron-init.service';
import { CronService } from './cron.service';
import { WebScrapingModule } from '../web-scraping/web-scraping.module';
import { SorteoABuscarModule } from '../sorteo_a_buscar/sorteo_a_buscar.module';
import { ResponseSorteoABuscarModule } from '../response_sorteo_a_buscar/response_sorteo_a_buscar.module';

@Module({
  imports: [
    SorteoABuscarModule,
    WebScrapingModule,
    ResponseSorteoABuscarModule,
  ],
  providers: [CronServiceInit, CronService],
})
export class CronModule {}
