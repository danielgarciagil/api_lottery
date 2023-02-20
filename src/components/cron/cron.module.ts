import { Module } from '@nestjs/common';

//Propio
import { CronService } from './cron.service';
import { SorteoModule } from '../sorteo/sorteo.module';

@Module({
  imports: [SorteoModule],
  providers: [CronService],
})
export class CronModule {}
