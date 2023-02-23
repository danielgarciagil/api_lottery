import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { CronService } from './cron.service';

//PROPIO

@Injectable()
export class CronServiceInit implements OnModuleInit {
  private readonly logger = new Logger('CRON-INIT');

  constructor(private readonly cronService: CronService) {}

  async onModuleInit() {
    this.logger.debug('INICIO EL MODULO DE CRON');
    await this.cronService.crear_tareas_automaticas();
    this.cronService.iniciar_tareas();
    console.log('TESTTT');
    this.cronService.test_probar_arr_tareas();
  }
}
