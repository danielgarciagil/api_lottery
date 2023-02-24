import { Module } from '@nestjs/common';

//Propio
import { CronServiceInit } from './cron-init.service';
import { SorteoModule } from '../sorteo/sorteo.module';
import { CronService } from './cron.service';
import { WebScrapingModule } from '../web-scraping/web-scraping.module';

@Module({
  imports: [SorteoModule, WebScrapingModule],
  providers: [CronServiceInit, CronService],
})
export class CronModule {}
