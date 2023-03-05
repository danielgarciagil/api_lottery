import { BadRequestException, Injectable, Logger } from '@nestjs/common';

//PROPIO
import { RESPONSE_BY_XPATH, ResponsePropioGQl } from './../../common/response';
import { XpathService } from '../xpath/xpath.service';
import { WebScrapingXpathService } from './WebScrapingXpath.service';
import { fecha_actual, arrFechasHoy } from './../../common/validar_fechas';
import { SorteoABuscarService } from '../sorteo_a_buscar/sorteo_a_buscar.service';
import { ResponseSorteoABuscarService } from '../response_sorteo_a_buscar/response_sorteo_a_buscar.service';
import { SorteoABuscar } from '../sorteo_a_buscar/entities/sorteo_a_buscar.entity';
import { pausaBySeg } from './../../common/funciones/bloquearPrograma';
import { Xpath } from '../xpath/entities/xpath.entity';
import { COMPROBAR_XPATH_IGUALES } from './../../common/funciones/arreglosIguales';
import { ResultadosService } from '../resultados/resultados.service';
import { Sorteo } from '../sorteo/entities/sorteo.entity';
import { MESSAGE } from 'src/config/messages';

@Injectable()
export class ResultadosSorteoService {
  constructor(
    private readonly xpathService: XpathService,
    private readonly sorteoABuscarService: SorteoABuscarService,
    private readonly responseSorteoABuscarSerive: ResponseSorteoABuscarService,
    private readonly resultadoService: ResultadosService,
  ) {}
  private readonly logger = new Logger('ResultadosSorteo-SERVICE');

  //? ESTE ES PARA EL RESOLVER QUE PUEDA VALIDAR LOS DATOS DE UN XPATH
  async validar_xpath_individual(id_xpath: number): Promise<RESPONSE_BY_XPATH> {
    const xpath = await this.xpathService.findOne(id_xpath);
    let WebScraping = new WebScrapingXpathService();
    const arr_fecha_hoy = arrFechasHoy();
    try {
      const res = await WebScraping.iniciar_xpath(xpath, arr_fecha_hoy);
      return res;
    } catch (error) {
      throw new BadRequestException(error?.message);
    } finally {
      WebScraping = null;
    }
  }

  //? ESTE ES PARA EL RESOLVER QUE PUEDA INICAR UNA BUSQUEDA AUTOMATICA
  async buscar_generar_autoamtico(
    id_sorteo_a_buscar: number,
  ): Promise<ResponsePropioGQl> {
    const sorteoABuscar = await this.sorteoABuscarService.devolverSiestaActivo(
      id_sorteo_a_buscar,
    );
    const responseSorteoABsucar = await this.responseSorteoABuscarSerive.create(
      {
        id_sorteo_a_buscar: sorteoABuscar.id,
        message: 'INICIO EL GENERADOR',
      },
    );
    this.generar_resultados_automaticos(
      sorteoABuscar,
      responseSorteoABsucar.id,
    );
    return {
      error: false,
      message: 'INICIO EL GENERADOR',
    };
  }

  //BUSCO LOS XPATH INDIVIDUAL Y DEVUELVO EL COORECTO
  async bucar_xpath(
    arrXpath: Xpath[],
    arr_fecha_a_buscar: string[],
  ): Promise<RESPONSE_BY_XPATH> {
    const instanciaXpath: RESPONSE_BY_XPATH[] = [];
    let WebScraping = new WebScrapingXpathService();
    try {
      for (const xpathActual of arrXpath) {
        if (!xpathActual.activo) continue;
        const xpathIndividual = await WebScraping.iniciar_xpath(
          xpathActual,
          arr_fecha_a_buscar,
        );
        instanciaXpath.push(xpathIndividual);
      }
    } catch (error) {
      throw new Error(error?.message);
    } finally {
      WebScraping = null;
    }
    return COMPROBAR_XPATH_IGUALES(instanciaXpath);
  }

  async premiarResultados(
    sorteo: Sorteo,
    xpath: RESPONSE_BY_XPATH,
    idResponse: number,
  ): Promise<ResponsePropioGQl> {
    let message = '';
    let error = true;
    const fecha_hoy = fecha_actual();
    for (let i = 0; i < 10; i++) {
      try {
        await this.resultadoService.createSinError({
          fecha: new Date(fecha_hoy),
          id_sorteo: sorteo.id,
          numeros_ganadores: xpath.data_by_xpath_digitos,
          id_user: 1,
        });
        error = false;
        message = 'SE PUBLICO BIEN';
        break;
      } catch (error) {
        if (
          error?.message ===
          MESSAGE.YA_ESTA_PUBLICADO_ESTE_RESULTADO_PARA_ESTA_FECHA
        ) {
          message = error?.message;
          error = false;
          break;
        }

        this.logger.error(error?.message);
        message = error?.message;
        error = true;

        await pausaBySeg(5);
      }
    }
    if (error) {
      await this.responseSorteoABuscarSerive.update(idResponse, {
        completed: true,
        is_error: true,
        message: message,
      });
      throw new Error(message);
    } else {
      await this.responseSorteoABuscarSerive.update(idResponse, {
        completed: true,
        is_error: false,
        message: message,
      });
    }

    return {
      error,
      message,
    };
  }

  //ESTE ME VA A GENERAR EL RESULTADO COMO TAL
  async generar_resultados_automaticos(
    sorteoABuscar: SorteoABuscar,
    idResponseSorteo: number,
  ): Promise<ResponsePropioGQl> {
    const arr_fecha_a_buscar = arrFechasHoy();
    let error = true;
    let message = '';

    for (let i = 0; i < sorteoABuscar.numeros_intentos; i++) {
      try {
        this.logger.debug(`BUSCANDO => ${sorteoABuscar.name}`);
        const xpath_a_publicar = await this.bucar_xpath(
          sorteoABuscar.xpath,
          arr_fecha_a_buscar,
        );

        await this.premiarResultados(
          sorteoABuscar.sorteo,
          xpath_a_publicar,
          idResponseSorteo,
        );
        error = false;
        message = 'SE PUBLICO EL XPATH';
        break;
      } catch (error) {
        this.logger.error(error?.message);
        await pausaBySeg(sorteoABuscar.tiempo_de_espera_segundos);
        error = true;
        message = error?.message;
      }
    }

    return {
      error,
      message,
    };
  }
}
