import { Injectable, Logger } from '@nestjs/common';
import * as cron from 'node-cron';

import { cronExpression } from './../../common/funciones/cronExpresion';
import { GenerarResultadosService } from '../web-scraping/generar-resultados.service';
import { SorteoABuscarService } from '../sorteo_a_buscar/sorteo_a_buscar.service';
import { SorteoABuscar } from '../sorteo_a_buscar/entities/sorteo_a_buscar.entity';
import { ResponseSorteoABuscarService } from '../response_sorteo_a_buscar/response_sorteo_a_buscar.service';

@Injectable()
export class CronService {
  constructor(
    private readonly sorteoABuscarService: SorteoABuscarService,
    private readonly generarResultadosService: GenerarResultadosService,
    private readonly responseSorteoABuscar: ResponseSorteoABuscarService,
  ) {}
  private tareas: cron.ScheduledTask[] = [];
  private logger: Logger = new Logger('Cron-Services');

  id_fecha_hoy(): number {
    const fecha_actual = new Date();
    return fecha_actual.getDay() + 1; //todo
  }

  //Devulvo todos los sorteos del dia en Curso
  async consultar_sorteosABuscar(): Promise<SorteoABuscar[]> {
    const id_fecha_hoy = this.id_fecha_hoy();
    const todos_los_sorteos = await this.sorteoABuscarService.findAllByDays(
      id_fecha_hoy,
    );
    return todos_los_sorteos;
  }

  // A las 12:00 AM cargos los nuevos cron y borros los anteriores
  iniciar_tareas() {
    if (process.env.NODE_ENV === 'PROD') {
      //todo this.borrar_cron_cargar_nuevos();
      cron.schedule('0 0 * * *', () => {
        this.borrar_cron_cargar_nuevos();
      });
    }
  }

  //Borro los cron existentes y creo nuevos
  borrar_cron_cargar_nuevos() {
    this.tareas.forEach((tareaCron) => {
      tareaCron.stop();
      tareaCron = null;
    });
    this.tareas = [];
    this.crear_tareas_automaticas();
  }

  //Creo los cron individuales y lo agregoa un Array
  async crear_tareas_automaticas() {
    const arrSorteosABuscars = await this.consultar_sorteosABuscar();
    for (const sorteoABuscar of arrSorteosABuscars) {
      if (sorteoABuscar.activo) {
        const sorteo = sorteoABuscar.sorteo;
        for (let i = 0; i < sorteo.sorteo_dias.length; i++) {
          const cron_expresion = cronExpression(
            sorteo.sorteo_dias[i].id,
            sorteo.sorteo_dias[i].hora,
          );

          this.logger.debug(
            `HOY SE BUSCARAN =>  ${sorteo.name} a las => ${cron_expresion}`,
          );
          const responseSorteo = await this.responseSorteoABuscar.create({
            id_sorteo_a_buscar: sorteoABuscar.id,
            message: 'Se instancio un nuevo response de Sorteo a Buscar',
          });
          const tarea = cron.schedule(cron_expresion, async () => {
            this.logger.debug(`Comenzo el Cron de este sorteo ${sorteo.name}`);
            let res = await this.generarResultadosService.init_generar(
              sorteoABuscar,
              responseSorteo.id,
            );
            this.logger.debug(res); // todo manejar esto por telegram por el momento
            res = null;
          });
          this.tareas.push(tarea);
        }
      }
    }
  }
}
