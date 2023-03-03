import { BadRequestException, Injectable } from '@nestjs/common';

//PROPIO
import { RESPONSE_BY_XPATH } from './../../common/response';
import { XpathService } from '../xpath/xpath.service';
import { WebScrapingXpathService } from './WebScrapingXpath.service';
import { fecha_actual } from './../../common/validar_fechas';

@Injectable()
export class ResultadosSorteoService {
  constructor(private readonly xpathService: XpathService) {}

  //? ESTE ES PARA EL RESOLVER DEL USER
  async validar_xpath_individual(id_xpath: number): Promise<RESPONSE_BY_XPATH> {
    const xpath = await this.xpathService.findOne(id_xpath);
    let WebScraping = new WebScrapingXpathService();
    try {
      const fecha_a_buscar = fecha_actual();
      const res = await WebScraping.iniciar_proceso_xpath(
        xpath,
        fecha_a_buscar,
      );
      return res;
    } catch (error) {
      throw new BadRequestException(error?.message);
    } finally {
      WebScraping = null;
    }
  }
}
