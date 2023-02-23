import { Module } from '@nestjs/common';

//Propio
import { CronServiceInit } from './cron-init.service';
import { SorteoModule } from '../sorteo/sorteo.module';
import { CronService } from './cron.service';

@Module({
  imports: [SorteoModule],
  providers: [CronServiceInit, CronService],
})
export class CronModule {}
