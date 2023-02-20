import { BadGatewayException, Injectable } from '@nestjs/common';

//PROPIO
import { ResponsePropioGQl } from '../../common/response';
import { MESSAGE } from '../../config/messages';
import { SorteoABuscarService } from '../sorteo_a_buscar/sorteo_a_buscar.service';
import { SorteoABuscar } from '../sorteo_a_buscar/entities/sorteo_a_buscar.entity';
import { RESPONSE_BY_XPATH } from './../../common/response';
import { ResultadosService } from '../resultados/resultados.service';
import { BuscarAutomaticoService } from './buscar-automatico.service';
import { XpathService } from '../xpath/xpath.service';
import { WebScrapingXpathService } from './WebScrapingXpath.service';

@Injectable()
export class ProcesoDeSorteoBuscarService {
  constructor(
    private readonly sorteoABuscarService: SorteoABuscarService,
    private readonly resultadosServiceE: ResultadosService,
    private readonly xpathService: XpathService,
  ) {}

  async validar_xpath_individual(id_xpath: number): Promise<RESPONSE_BY_XPATH> {
    const xpath = await this.xpathService.findOne(id_xpath);
    const test = new WebScrapingXpathService();
    return await test.iniciar_proceso_xpath(xpath);
  }

  async iniciar_proceso_sorteo_a_buscar(
    id_sorteo_a_buscar: number,
  ): Promise<ResponsePropioGQl> {
    const sorteo = await this.combrobar_status_sorteo_a_buscar(
      id_sorteo_a_buscar,
    );
    this.init(sorteo);

    //todo si se esta buscando avisar
    return {
      message: 'COMENZO EL PROCESO AUTOMATICO',
      error: false,
      status: 200,
    };
  }

  async init(sorteo_a_buscar: SorteoABuscar): Promise<ResponsePropioGQl> {
    try {
      const sorteo = new BuscarAutomaticoService();
      const response = await sorteo.iniciar_busqueda(sorteo_a_buscar);

      await this.publicar(sorteo_a_buscar, response);

      return {
        error: false,
        message: 'SE PUBLICO BIEN',
        status: 200,
      };
    } catch (error) {
      return {
        error: true,
        message: error,
        status: 400,
      };
    }
  }

  async combrobar_status_sorteo_a_buscar(
    id_sorteo_a_buscar: number,
  ): Promise<SorteoABuscar> {
    const sorteo_a_buscar = await this.sorteoABuscarService.findOne(
      id_sorteo_a_buscar,
    );
    if (!sorteo_a_buscar.activo) {
      throw new BadGatewayException(MESSAGE.COMUN_ESTE_ELEMENTO_ESTA_INACTIVO);
    }
    if (sorteo_a_buscar.buscando) {
      throw new BadGatewayException(
        MESSAGE.YA_SE_ESTA_BUSCANDO_AUTOMATICAMENTE_ESTE_SORTEO,
      );
    }
    return sorteo_a_buscar;
  }

  async publicar(
    sorteo_a_buscar: SorteoABuscar,
    response_xpath: RESPONSE_BY_XPATH,
  ) {
    await this.resultadosServiceE.create({
      numeros_ganadores: response_xpath.data_by_xpath_digitos,
      fecha: new Date(response_xpath.data_by_xpath_fecha),
      id_sorteo: sorteo_a_buscar.sorteo.id,
    });
  }
}
