import { BadRequestException, Injectable, Logger } from '@nestjs/common';

//PROPIO
import { RESPONSE_BY_XPATH, ResponsePropioGQl } from './../../common/response';
import { XpathService } from '../xpath/xpath.service';
import { WebScrapingXpathService } from './WebScrapingXpath.service';
import { SorteoABuscarService } from '../sorteo_a_buscar/sorteo_a_buscar.service';
import { ResponseSorteoABuscarService } from '../response_sorteo_a_buscar/response_sorteo_a_buscar.service';
import { SorteoABuscar } from '../sorteo_a_buscar/entities/sorteo_a_buscar.entity';
import { Xpath } from '../xpath/entities/xpath.entity';
import { ResultadosService } from '../resultados/resultados.service';
import {
  arrFechasHoy,
  COMPROBAR_DIGITOS_IGUALES_ARR_XPATH,
  pausaBySeg,
  fecha_actual,
} from './../../common';

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
    //console.log(arr_fecha_hoy);
    try {
      const res = await WebScraping.iniciar_xpath(xpath, arr_fecha_hoy);
      return res;
    } catch (error) {
      this.logger.error(error?.message);
      throw new BadRequestException(error?.message);
    } finally {
      WebScraping = null;
    }
  }

  //? ESTE ES PARA EL RESOLVER QUE PUEDA INICAR UNA BUSQUEDA AUTOMATICA
  async buscar_generar_autoamtico(
    id_sorteo_a_buscar: number,
  ): Promise<ResponsePropioGQl> {
    const sorteoABuscar = await this.sorteoABuscarService.devolverSiEstaActivo(
      id_sorteo_a_buscar,
    );
    const responseSorteoABsucar = await this.responseSorteoABuscarSerive.create(
      {
        id_sorteo_a_buscar: sorteoABuscar.id,
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
    return COMPROBAR_DIGITOS_IGUALES_ARR_XPATH(instanciaXpath);
  }

  //ESTE ME VA A GENERAR EL RESULTADO COMO TAL
  async generar_resultados_automaticos(
    sorteoABuscar: SorteoABuscar,
    idResponseSorteo: number,
  ): Promise<ResponsePropioGQl> {
    const arr_fecha_a_buscar = arrFechasHoy();
    const fecha_a_publicar = fecha_actual();
    let message = '';
    let error = true;
    for (let i = 0; i < sorteoABuscar.numeros_intentos; i++) {
      try {
        this.logger.debug(`BUSCANDO => ${sorteoABuscar.name}`);
        const xpath_a_publicar = await this.bucar_xpath(
          sorteoABuscar.xpath,
          arr_fecha_a_buscar,
        );
        message = 'SE ENCONTRO LA DATA';
        await this.resultadoService.createAutomatico({
          fecha: new Date(fecha_a_publicar),
          id_sorteo: sorteoABuscar.sorteo.id,
          id_user: 1,
          numeros_ganadores: xpath_a_publicar.data_by_xpath_digitos,
        });
        message = 'SE PUBLICO BIEN';
        error = false;
        break;
      } catch (error) {
        this.logger.error(
          `SORTEO: ${sorteoABuscar.name} ERROR: ${error?.message}`,
        );
        await pausaBySeg(sorteoABuscar.tiempo_de_espera_segundos);
        error = true;
        message = error?.message || 'HUBO UN ERROR AL BUSCAR LA DATA';
      }
    }

    await this.responseSorteoABuscarSerive.update(idResponseSorteo, {
      is_error: error,
      completed: true,
      message: message,
    });
    this.logger.debug(`SORTEO => ${sorteoABuscar.name} STATUS => ${message}`);
    return {
      error,
      message,
    };
  }
}
