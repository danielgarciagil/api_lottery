import { Injectable, Logger } from '@nestjs/common';
import * as cron from 'node-cron';

import { cronExpression } from './../../common/funciones/cronExpresion';
import { SorteoABuscarService } from '../sorteo_a_buscar/sorteo_a_buscar.service';
import { SorteoABuscar } from '../sorteo_a_buscar/entities/sorteo_a_buscar.entity';
import { ResponseSorteoABuscarService } from '../response_sorteo_a_buscar/response_sorteo_a_buscar.service';
import { LotenetPremio } from '../lotenet-premios/entities/lotenet-premio.entity';
import { LotenetPremiosService } from '../lotenet-premios/lotenet-premios.service';
import { PremiosAutomaticoLotenetService } from '../premios-automatico-lotenet/premios-automatico-lotenet.service';
import { ResponseLotenetPremioService } from '../response-lotenet-premio/response-lotenet-premio.service';
import { ResultadosSorteoService } from '../web-scraping/resultados-sorteo.service';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class CronService {
  constructor(
    private readonly sorteoABuscarService: SorteoABuscarService,
    private readonly responseSorteoABuscar: ResponseSorteoABuscarService,
    private readonly responseLotenetPremio: ResponseLotenetPremioService,
    private readonly lotenetPremiosService: LotenetPremiosService,
    private readonly premiosAutomaticoLotenetService: PremiosAutomaticoLotenetService,
    private readonly resultadosSorteo: ResultadosSorteoService,
    private readonly telegramService: TelegramService,
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

  //Devulvo todos los Lotenet Premios del dia en Curso
  async consultar_lotenetPremio(): Promise<LotenetPremio[]> {
    const id_fecha_hoy = this.id_fecha_hoy();
    const todos_los_lotenet = await this.lotenetPremiosService.findAllByDays(
      id_fecha_hoy,
    );
    return todos_los_lotenet;
  }

  // A las 12:00 AM cargos los nuevos cron y borros los anteriores
  async iniciar_tareas() {
    //this.borrar_cron_cargar_nuevos();
    cron.schedule('0 2 * * *', async () => {
      await this.borrar_cron_cargar_nuevos();
    });
  }

  //Borro los cron existentes y creo nuevos
  async borrar_cron_cargar_nuevos() {
    for (const tarea of this.tareas) {
      tarea.stop();
    }
    this.tareas = [];
    await this.crear_Sorteos_A_Buscar_automaticas();
    await this.crear_premios_lotenet_automaticos();
  }

  async crear_premios_lotenet_automaticos() {
    const arrLotenetPremios = await this.consultar_lotenetPremio();
    for (const lotenetPremio of arrLotenetPremios) {
      if (!lotenetPremio.activo) continue;
      for (let i = 0; i < lotenetPremio.premio_dia.length; i++) {
        const cron_expresion = cronExpression(
          lotenetPremio.premio_dia[i].id,
          lotenetPremio.premio_dia[i].hora,
        );
        this.logger.warn(
          `CRON LOTENET => ${lotenetPremio.name} : ${cron_expresion}`,
        );
        const responsePremio = await this.responseLotenetPremio.create({
          id_lotenet_premio: lotenetPremio.id,
        });
        const tareaLotenet = cron.schedule(cron_expresion, async () => {
          const response =
            await this.premiosAutomaticoLotenetService.premiarAutomatico(
              lotenetPremio,
              responsePremio.id,
            );
          this.logger.debug(`${response.message} => ${lotenetPremio.name}`); // todo manejar esto por telegram por el momento
          //await this.telegramService.sendNotificaciones(response);
          //response = null;
        });
        this.tareas.push(tareaLotenet);
      }
    }
  }

  //Creo los cron individuales de Buscar Numeros y lo agregoa un Array
  async crear_Sorteos_A_Buscar_automaticas() {
    const arrSorteosABuscars = await this.consultar_sorteosABuscar();
    for (const sorteoABuscar of arrSorteosABuscars) {
      if (!sorteoABuscar.activo) continue;
      const sorteo = sorteoABuscar.sorteo;
      for (let i = 0; i < sorteo.sorteo_dias.length; i++) {
        const cron_expresion = cronExpression(
          sorteo.sorteo_dias[i].id,
          sorteo.sorteo_dias[i].hora,
        );

        this.logger.warn(`CRON SORTEO => ${sorteo.name} => ${cron_expresion}`);

        const responseSorteo = await this.responseSorteoABuscar.create({
          id_sorteo_a_buscar: sorteoABuscar.id,
        });

        const tarea = cron.schedule(cron_expresion, async () => {
          this.logger.debug(`Comenzo el Cron de este sorteo ${sorteo.name}`);
          //try {
          const response =
            await this.resultadosSorteo.generar_resultados_automaticos(
              sorteoABuscar,
              responseSorteo.id,
            );
          this.logger.debug(response.message); // todo manejar esto por telegram por el momento
          //await this.telegramService.sendNotificaciones(response);
          //response = null;
          //} catch (error) {
          //  this.logger.error(`CRON => ERROR: ${error?.message}`);
          //}
        });
        this.tareas.push(tarea);
      }
    }
  }
}
