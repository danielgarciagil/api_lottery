import { Injectable } from '@nestjs/common';
import { isEqual } from 'lodash';

import { RESPONSE_BY_XPATH } from './../../common/response';
import { SorteoABuscar } from '../sorteo_a_buscar/entities/sorteo_a_buscar.entity';
import { WebScrapingXpathService } from './WebScrapingXpath.service';

@Injectable()
export class BuscarAutomaticoService {
  fecha_actual(): string {
    const fecha = new Date().toISOString();
    return fecha.slice(0, 10);
  }

  async bloquearPrograma(time: number) {
    await new Promise((resolve) => setTimeout(resolve, time * 1000));
  }

  comprobar_arreglos_iguales(arr: RESPONSE_BY_XPATH[]): boolean {
    const arr_iguales = arr.every((elem, index, array) =>
      isEqual(elem, array[0]),
    );
    if (arr_iguales) {
      return true;
    } else {
      return false;
    }
  }

  async iniciar_busqueda(
    sorteo_a_buscar: SorteoABuscar,
  ): Promise<RESPONSE_BY_XPATH> {
    const fecha = this.fecha_actual();
    let numero_a_publicar: number[];
    let fecha_a_publicar: string;
    let message_error: string;

    for (let i = 0; i < sorteo_a_buscar.numeros_intentos; i++) {
      const data_xpath = await this.web_scraping_by_xpath(sorteo_a_buscar);
      message_error = data_xpath.message;
      if (!data_xpath.error) {
        if (fecha == data_xpath.data_by_xpath_fecha) {
          numero_a_publicar = data_xpath.data_by_xpath_digitos;
          fecha_a_publicar = data_xpath.data_by_xpath_fecha;
          break;
        }
      }
      await this.bloquearPrograma(sorteo_a_buscar.tiempo_de_espera_segundos);
    }
    if (numero_a_publicar && fecha_a_publicar) {
      return {
        data_by_xpath_digitos: numero_a_publicar,
        data_by_xpath_fecha: fecha_a_publicar,
        error: false,
        message: 'SE ENCONTRO EL XPATH',
      };
    }

    return {
      error: true,
      data_by_xpath_digitos: [],
      data_by_xpath_fecha: '',
      message: message_error,
    };
  }

  //? Aqui instancio todos los xpath de un sorteo
  async web_scraping_by_xpath(
    sorteo_a_buscar: SorteoABuscar,
  ): Promise<RESPONSE_BY_XPATH> {
    const elementos_a_instanciar: RESPONSE_BY_XPATH[] = [];
    try {
      //? Comienzo el proceso de buscar los diferentes XPATH
      for (const xpath_actual of sorteo_a_buscar.xpath) {
        const instancia = new WebScrapingXpathService();
        const init = await instancia.iniciar_proceso_xpath(xpath_actual);
        elementos_a_instanciar.push(init);
      }
      const data = await Promise.all(elementos_a_instanciar);
      this.comprobar_arreglos_iguales(data);

      return {
        error: false,
        message: 'BUSQUEDA FINALIZADA DE SORTEO A BUSCAR',
        data_by_xpath_digitos: data[0].data_by_xpath_digitos,
        data_by_xpath_fecha: data[0].data_by_xpath_fecha,
      };
    } catch (error) {
      return {
        error: true,
        message: error,
        data_by_xpath_digitos: [],
        data_by_xpath_fecha: '',
      };
    }
  }
}
