import { Injectable } from '@nestjs/common';
import * as cron from 'node-cron';

import { SorteoService } from '../sorteo/sorteo.service';
import { Sorteo } from '../sorteo/entities/sorteo.entity';
import { cronExpression } from './../../common/funciones/cronExpresion';
import { ProcesoDeSorteoBuscarService } from '../web-scraping/proceso_de_sorteo_a_buscar.service';
@Injectable()
export class CronService {
  constructor(
    private readonly sorteoService: SorteoService,
    private readonly procesoDeSorteoBuscarService: ProcesoDeSorteoBuscarService,
  ) {}
  private tareas: cron.ScheduledTask[] = [];

  id_fecha_hoy(): number {
    const fecha_actual = new Date();
    return fecha_actual.getDay() + 1; //todo
  }

  //Devulvo todos los sorteos del dia en Curso
  async consultar_sorteos(): Promise<Sorteo[]> {
    const id_fecha_hoy = this.id_fecha_hoy();
    const todos_los_sorteos = await this.sorteoService.findAllByDays(
      id_fecha_hoy,
    ); //TODO
    return todos_los_sorteos;
  }

  // A las 12:00 AM cargos los nuevos cron y borros los anteriores
  iniciar_tareas() {
    this.borrar_cron_cargar_nuevos();
    cron.schedule('0 0 * * *', () => {
      this.borrar_cron_cargar_nuevos();
    });
  }

  //Borro los cron existentes y creo nuevos
  borrar_cron_cargar_nuevos() {
    this.tareas.forEach((tareacron) => {
      tareacron.stop();
    });
    this.tareas = [];
    this.crear_tareas_automaticas();
  }

  //Creo los cron individuales y lo agregoa un Array
  async crear_tareas_automaticas() {
    const sorteos = await this.consultar_sorteos();
    for (const sorteo of sorteos) {
      for (let i = 0; i < sorteo.sorteo_dias.length; i++) {
        const cron_expresion = cronExpression(
          sorteo.sorteo_dias[i].id,
          sorteo.sorteo_dias[i].hora,
        );
        const tarea = cron.schedule(cron_expresion, () => {
          console.log(`Esta buscando este sorteo ${sorteo.name}`);
          console.log(sorteo);
          this.procesoDeSorteoBuscarService.iniciar_proceso_sorteo_a_buscar(
            sorteo.sorteo_a_buscar.id,
          );
        });
        this.tareas.push(tarea);
      }
    }
  }
}
