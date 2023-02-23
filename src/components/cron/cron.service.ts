import { Injectable } from '@nestjs/common';
import * as cron from 'node-cron';

import { SorteoService } from '../sorteo/sorteo.service';
import { Sorteo } from '../sorteo/entities/sorteo.entity';
@Injectable()
export class CronService {
  constructor(private readonly sorteoService: SorteoService) {}
  private tareas: cron.ScheduledTask[] = [];

  id_fecha_hoy(): number {
    const fecha_actual = new Date();
    return fecha_actual.getDay() + 1; //todo
  }

  async consultar_sorteos(): Promise<Sorteo[]> {
    const id_fecha_hoy = this.id_fecha_hoy();
    const todos_los_sorteos = await this.sorteoService.findAllByDays(
      id_fecha_hoy,
    ); //TODO
    return todos_los_sorteos;
  }

  iniciar_tareas() {
    //this.tareas.forEach((tareacron) => {
    //  tareacron.start();
    //});
    console.log(this.tareas);
  }

  //ttodod qeude aqui para eliminar todo
  test_probar_arr_tareas() {
    this.tareas.forEach((tareacron) => {
      tareacron.stop();
    });
    this.tareas = [];
    console.log(this.tareas);
  }

  async crear_tareas_automaticas() {
    const sorteos = await this.consultar_sorteos();
    for (const sorteo of sorteos) {
      for (let i = 0; i < sorteo.sorteo_dias.length; i++) {
        const cron_expresion = cronExpression(
          sorteo.sorteo_dias[i].id,
          sorteo.sorteo_dias[i].hora,
        );
        console.log(cron_expresion);
        const tarea = cron.schedule(cron_expresion, () => {
          console.log('AQUI MAND TAREA');
        });
        this.tareas.push(tarea);
      }
    }
  }

  //TODO crear un cron que cada dia a las 12:00, me apre los cron vieos y me cargues los nuevos,
  //Pero solo me cargaria los cron que pertenecen a ese dia especifico, no me lo cargaria todos
  // async testCron() {
  //   cron.validate('');
  //   cron.getTasks();
  //   const tarea = cron.schedule('26 23 * * * ', () => {
  //     console.log('ENTTTRO');
  //   });
  //   tarea.stop();
  // }
}

const cronExpression = (date: number, time: string): string => {
  // Obtenemos los valores de hora y minutos de la hora especificada
  const [hora, minuto] = time.split(':');

  // Configuramos la fecha para que coincida con la fecha especificada, y establecemos la hora y minutos
  const cronDate = new Date();
  cronDate.setHours(parseInt(hora, 10));
  cronDate.setMinutes(parseInt(minuto, 10));

  // Obtenemos los valores de segundo, minuto, hora, día del mes, mes y día de la semana
  const minuteCron = cronDate.getMinutes();
  const hourCron = cronDate.getHours();

  // Componemos la expresión de cron con los valores obtenidos
  //const cronExpression = `* ${minuteCron} ${hourCron} * * ${date - 1}`; //todo;
  const cronExpression = `${minuteCron} ${hourCron} * * *`; //todo;

  return cronExpression;
};
