import { BadGatewayException, Injectable } from '@nestjs/common';

//PROPIO
import { ResponsePropioGQl } from '../../common/response';
import { MESSAGE } from '../../config/messages';
import { SorteoABuscarService } from '../sorteo_a_buscar/sorteo_a_buscar.service';
import { SorteoABuscar } from '../sorteo_a_buscar/entities/sorteo_a_buscar.entity';
import { WebScrapingXpathService } from './WebScrapingXpath.service';

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
    try {
      this.comenzar_web_scraping(sorteo_a_buscar);
      return {
        message: '',
        status: 2,
      };
    } catch (error) {
      throw new BadGatewayException();
    }
  }

  async comenzar_web_scraping(sorteo_a_buscar: SorteoABuscar) {
    const elementos_a_instanciar = [];
    for (const xpath_actual of sorteo_a_buscar.xpath) {
      const instancia = this.webScrapingXpathService.buscar(xpath_actual.id);
      elementos_a_instanciar.push(instancia);
    }
    try {
      const resultados = await Promise.all(elementos_a_instanciar);
      console.log(resultados);
    } catch (error) {
      console.log(error);
    }
  }

  async bloquearPrograma(time: number) {
    console.log('Inicio');
    await new Promise((resolve) => setTimeout(resolve, time * 1000));
    console.log('Después de 5 segundos');
  }

  //await this.bloquearPrograma(2);
}
