import { Injectable, OnModuleInit } from '@nestjs/common';
import { CronService } from './cron.service';

//PROPIO

@Injectable()
export class CronServiceInit implements OnModuleInit {
  constructor(private readonly cronService: CronService) {}

  async onModuleInit() {
    await this.cronService.iniciar_tareas();
  }
}
