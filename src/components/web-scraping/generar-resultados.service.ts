import { BadRequestException, Injectable, Logger } from '@nestjs/common';

//PROPIO
import { XpathService } from '../xpath/xpath.service';
import { WebScrapingXpathService } from './WebScrapingXpath.service';
import { RESPONSE_BY_XPATH, ResponsePropioGQl } from './../../common/response';
import { MESSAGE } from './../../config/messages';
import { SorteoABuscarService } from '../sorteo_a_buscar/sorteo_a_buscar.service';
import { SorteoABuscar } from '../sorteo_a_buscar/entities/sorteo_a_buscar.entity';
import { BuscarAutomaticoService } from './buscar-automatico.service';
import { ResultadosService } from '../resultados/resultados.service';
import { ResponseSorteoABuscarService } from '../response_sorteo_a_buscar/response_sorteo_a_buscar.service';

@Injectable()
export class GenerarResultadosService {
  private logger: Logger = new Logger('Generar-Resultados-Services');

  constructor(
    private readonly xpathService: XpathService,
    private readonly sorteoABuscarService: SorteoABuscarService,
    private readonly resultadosServiceE: ResultadosService,
    private readonly responseSorteoABuscarService: ResponseSorteoABuscarService,
    private readonly buscarAutomaticoService: BuscarAutomaticoService,
  ) {}

  async bloquearPrograma(time: number) {
    await new Promise((resolve) => setTimeout(resolve, time * 1000));
  }

  async generar_resultados(
    id_sorteo_a_buscar: number,
  ): Promise<ResponsePropioGQl> {
    try {
      const responseSorteo = await this.combrobar_status_sorteo_a_buscar(
        id_sorteo_a_buscar,
      );
      const responseSorteoABuscar =
        await this.responseSorteoABuscarService.create({
          id_sorteo_a_buscar: responseSorteo.id,
          message: 'SE INSTANCIO',
        });
      this.init_generar(responseSorteo, responseSorteoABuscar.id);
      return {
        error: false,
        message: 'INICIO EL GENERADOR',
      };
    } catch (error) {
      this.logger.error(error?.message);
      return {
        error: true,
        message: error,
      };
    }
  }

  async init_generar(
    sorteoABuscar: SorteoABuscar,
    id_response_sorteo: number,
  ): Promise<ResponsePropioGQl> {
    try {
      this.logger.debug(`BUSCANDO: ${sorteoABuscar.name}`);
      const response = await this.buscarAutomaticoService.iniciar_busqueda(
        sorteoABuscar,
      );

      if (response.error) throw new Error(response.message);

      const msPublicar = await this.publicar(sorteoABuscar, response);

      await this.responseSorteoABuscarService.update(id_response_sorteo, {
        message: msPublicar,
      });
      this.logger.debug(`${msPublicar} => ${sorteoABuscar.name}`);
      return {
        error: false,
        message: `${msPublicar} => ${sorteoABuscar.name}`,
      };
    } catch (error) {
      await this.responseSorteoABuscarService.update(
        id_response_sorteo,
        error?.message,
      );
      this.logger.error(error?.message);
      throw new Error(error?.message);
    }
  }

  async combrobar_status_sorteo_a_buscar(
    id_sorteo_a_buscar: number,
  ): Promise<SorteoABuscar> {
    const sorteo_a_buscar = await this.sorteoABuscarService.findOneSinError(
      id_sorteo_a_buscar,
    );
    if (!sorteo_a_buscar) {
      throw Error(MESSAGE.COMUN_ESTE_ID_NO_EXISTE);
    }
    if (!sorteo_a_buscar.activo) {
      throw Error(MESSAGE.COMUN_ESTE_ELEMENTO_ESTA_INACTIVO);
    }
    return sorteo_a_buscar;
  }

  async publicar(
    sorteo_a_buscar: SorteoABuscar,
    response_xpath: RESPONSE_BY_XPATH,
  ): Promise<string> {
    let publicar = false;
    for (let i = 0; i < 10; i++) {
      try {
        await this.resultadosServiceE.createSinError({
          numeros_ganadores: response_xpath.data_by_xpath_digitos,
          fecha: new Date(response_xpath.data_by_xpath_fecha),
          id_sorteo: sorteo_a_buscar.sorteo.id,
          id_user: 1, //todo modificar por el momento todo se va a vincular al user 1
        });
        publicar = true;
      } catch (error) {
        this.logger.error(error?.message);
        await this.bloquearPrograma(5);
      }
      if (publicar) break;
    }
    if (!publicar) throw new Error('NO SE PUBLICO SE INTENTO 10 VECES');
    return 'SE PUBLICO BIEN';
  }
}
