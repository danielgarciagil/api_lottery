import { Injectable, Logger } from '@nestjs/common';

//PROPIO
import { XpathService } from '../xpath/xpath.service';
import { WebScrapingXpathService } from './WebScrapingXpath.service';
import { RESPONSE_BY_XPATH, ResponsePropioGQl } from './../../common/response';
import { MESSAGE } from 'src/config/messages';
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
  ) {}

  async validar_xpath_individual(id_xpath: number): Promise<RESPONSE_BY_XPATH> {
    const test_xpath = new WebScrapingXpathService();
    const xpath = await this.xpathService.findOneSinError(id_xpath);
    if (!xpath) {
      return {
        data_by_xpath_digitos: [],
        data_by_xpath_fecha: '',
        error: true,
        message: MESSAGE.COMUN_ESTE_ID_NO_EXISTE,
      };
    }
    return await test_xpath.iniciar_proceso_xpath(xpath);
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
          message: 'Se instancio un nuevo response de Sorteo a Buscar',
        });
      this.init_generar(responseSorteo, responseSorteoABuscar.id); //todo
      return {
        error: false,
        message: 'INICIO EL GENERADOR',
        status: 201,
      };
    } catch (error) {
      return {
        error: true,
        message: error,
        status: 400,
      };
    }
  }

  async init_generar(
    sorteoABuscar: SorteoABuscar,
    id_response_sorteo: number,
  ): Promise<ResponsePropioGQl> {
    try {
      this.logger.log(
        `Se Instancio una clase nueva de Buscar para: ${sorteoABuscar.name}`,
      );
      const sorteo = new BuscarAutomaticoService();
      const response = await sorteo.iniciar_busqueda(sorteoABuscar);

      if (!response.error) {
        await this.publicar(sorteoABuscar, response);
        //todo me falta manjear todas las respuesttas de sorteoabuscar
        await this.responseSorteoABuscarService.update(id_response_sorteo, {
          message: 'Se publico bien',
        });
        return {
          error: false,
          message: `SE PUBLICO BIEN => ${sorteoABuscar.name}`,
          status: 200,
        };
      }
      return {
        error: true,
        message: `NO SE PUBLICO => ${sorteoABuscar.name}`,
        status: 200,
      };
    } catch (error) {
      return {
        error: true,
        message: `NO SE PUBLICO => ${sorteoABuscar.name} ERROR => ${error}`,
        status: 400,
      };
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
  ) {
    await this.resultadosServiceE.createSinError({
      numeros_ganadores: response_xpath.data_by_xpath_digitos,
      fecha: new Date(response_xpath.data_by_xpath_fecha),
      id_sorteo: sorteo_a_buscar.sorteo.id,
    });
  }
}
