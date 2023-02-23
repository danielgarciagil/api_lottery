import { Injectable } from '@nestjs/common';
import * as cron from 'node-cron';

import { SorteoService } from '../sorteo/sorteo.service';
@Injectable()
export class CronService {
  constructor(private readonly sorteoService: SorteoService) {}

  async consultar_sorteos() {
    const todos_los_sorteos = await this.sorteoService.findAll({
      limit: 999,
      offset: 0,
    }); //TODO

    //console.log(todos_los_sorteos[0].sorteo_dias);
    const res = cronExpression(
      todos_los_sorteos[0].sorteo_dias[0].dias.id,
      todos_los_sorteos[0].sorteo_dias[0].hora,
    );
    console.log(res);
  }
  //TODO crear un cron que cada dia a las 12:00, me apre los cron vieos y me cargues los nuevos,
  //Pero solo me cargaria los cron que pertenecen a ese dia especifico, no me lo cargaria todos
  async testCron() {
    cron.validate('');
    cron.getTasks();
    const tarea = cron.schedule('26 23 * * * ', () => {
      console.log('ENTTTRO');
    });
    tarea.stop();
  }
}

const cronExpression = (date: number, time: string): string => {
  // Obtenemos los valores de hora y minutos de la hora especificada
  const [hora, minuto, segundo] = time.split(':');

  // Configuramos la fecha para que coincida con la fecha especificada, y establecemos la hora y minutos
  const cronDate = new Date();
  cronDate.setHours(parseInt(hora, 10));
  cronDate.setMinutes(parseInt(minuto, 10));

  // Obtenemos los valores de segundo, minuto, hora, día del mes, mes y día de la semana
  const minuteCron = cronDate.getMinutes();
  const hourCron = cronDate.getHours();

  // Componemos la expresión de cron con los valores obtenidos
  const cronExpression = `* ${minuteCron} ${hourCron} * * ${date - 1}`;

  return cronExpression;
};
