import { BadGatewayException, Injectable } from '@nestjs/common';
import { isEqual } from 'lodash';

//PROPIO
import { ResponsePropioGQl } from '../../common/response';
import { MESSAGE } from '../../config/messages';
import { SorteoABuscarService } from '../sorteo_a_buscar/sorteo_a_buscar.service';
import { SorteoABuscar } from '../sorteo_a_buscar/entities/sorteo_a_buscar.entity';
import { WebScrapingXpathService } from './WebScrapingXpath.service';
import { RESPONSE_ALLS_XPATH } from './types/xpath.type';

@Injectable()
export class ProcesoDeSorteoBuscarService {
  constructor(
    private readonly sorteoABuscarService: SorteoABuscarService,
    private readonly webScrapingXpathService: WebScrapingXpathService,
  ) {}

  async buscarBySorteoWebScraping(
    id_sorteo_a_buscar: number,
  ): Promise<ResponsePropioGQl> {
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
    await this.sorteoABuscarService.cambiar_estado__de_buscando(
      sorteo_a_buscar.id,
      true,
    );
    try {
      const message = await this.comenzar_web_scraping(sorteo_a_buscar);
      await this.sorteoABuscarService.cambiar_estado__de_buscando(
        id_sorteo_a_buscar,
        false,
      );
      return {
        message: message.message,
        status: 200,
      };
    } catch (error) {
      await this.sorteoABuscarService.cambiar_estado__de_buscando(
        id_sorteo_a_buscar,
        false,
      );
      console.log(error);
      throw new BadGatewayException();
    }
  }

  async comenzar_web_scraping(
    sorteo_a_buscar: SorteoABuscar,
  ): Promise<RESPONSE_ALLS_XPATH> {
    //? Aqui instancio todos los xpath de un sorteo
    const elementos_a_instanciar: RESPONSE_ALLS_XPATH[] = [];

    //? Comienzo el proceso de buscar los diferentes XPATH
    for (const xpath_actual of sorteo_a_buscar.xpath) {
      //todo no colocr una wait para no aprar el procesoy ver varios xpath del mismo sorteo al mismo tiempo
      const instancia = await this.webScrapingXpathService.buscar(
        xpath_actual.id,
      );

      elementos_a_instanciar.push(instancia);
    }
    try {
      const resultados = await Promise.all(elementos_a_instanciar);

      const sonIguales = resultados.every((elem, index, array) =>
        isEqual(elem, array[0]),
      );
      if (sonIguales) {
        return {
          xpath_digitos: resultados[0].xpath_digitos, //todo que pasa si no tiene
          xpath_fecha: resultados[0].xpath_fecha,
          error: false,
          message: 'Resultados Iguales',
        };
      } else {
        return {
          xpath_digitos: [],
          xpath_fecha: '',
          error: true,
          message: 'NO SON IGUALES LOS RESULTADOS',
        };
      }
    } catch (error) {
      throw new BadGatewayException();
    }
  }
}
