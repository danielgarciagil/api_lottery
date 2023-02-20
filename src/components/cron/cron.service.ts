import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as cron from 'node-cron';

import { SorteoService } from '../sorteo/sorteo.service';

//PROPIO

@Injectable()
export class CronService implements OnModuleInit {
  private readonly logger = new Logger('CRON-INIT');

  constructor(private readonly sorteoService: SorteoService) {}

  async consultar_sorteos() {
    const todos_los_sorteos = await this.sorteoService.findAll({
      limit: 999,
      offset: 0,
    }); //TODO

    console.log(todos_los_sorteos[0].sorteo_dias);
    const res = cronExpression(
      todos_los_sorteos[0].sorteo_dias[0].dias.id,
      todos_los_sorteos[0].sorteo_dias[0].hora,
    );
    console.log(res);
  }

  async onModuleInit() {
    await this.consultar_sorteos();
    this.logger.debug('INICIO EL MODULO DE CRON');
  }
}

const cronExpression = (date: number, time: string): string => {
  // Obtenemos los valores de hora y minutos de la hora especificada
  const [hour, minute] = time.split(':').map(Number);

  // Configuramos la fecha para que coincida con la fecha especificada, y establecemos la hora y minutos
  console.log(time);
  const cronDate = new Date(time);
  console.log(cronDate);
  cronDate.setHours(hour);
  cronDate.setMinutes(minute);

  // Obtenemos los valores de segundo, minuto, hora, día del mes, mes y día de la semana
  const minuteCron = cronDate.getMinutes();
  const hourCron = cronDate.getHours();

  // Componemos la expresión de cron con los valores obtenidos
  const cronExpression = `* ${minuteCron} ${hourCron} * * ${date - 1}`;

  return cronExpression;
};
