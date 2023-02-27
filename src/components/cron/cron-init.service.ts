import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { CronService } from './cron.service';

//PROPIO

@Injectable()
export class CronServiceInit implements OnModuleInit {
  private readonly logger = new Logger('CRON-INIT');

  constructor(private readonly cronService: CronService) {}

  async onModuleInit() {
    this.logger.debug('INICIO EL MODULO DE CRON');
    //this.cronService.iniciar_tareas(); //todo poner esto
  }
}
