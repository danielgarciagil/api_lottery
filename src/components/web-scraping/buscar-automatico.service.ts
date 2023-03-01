import { Injectable, Logger } from '@nestjs/common';
import { isEqual } from 'lodash';
import * as moment from 'moment';

import { RESPONSE_BY_XPATH } from './../../common/response';
import { SorteoABuscar } from '../sorteo_a_buscar/entities/sorteo_a_buscar.entity';
import { WebScrapingXpathService } from './WebScrapingXpath.service';

@Injectable()
export class BuscarAutomaticoService {
  private logger: Logger = new Logger('Buscar-Automatico-Services');
  fecha_actual(): string {
    const fechaActual = moment().format('YYYY-MM-DD');
    return fechaActual;
  }

  async bloquearPrograma(time: number) {
    await new Promise((resolve) => setTimeout(resolve, time * 1000));
  }

  comprobar_arreglos_iguales_sin_errores(arr: RESPONSE_BY_XPATH[]) {
    if (arr.length <= 0) {
      throw Error('NO SE MANDO NINGUN XPATH A VALIDAR');
    }

    arr.forEach((response) => {
      if (response.error) {
        throw Error(response.message);
      }
    });
    console.log(arr);

    const arr_iguales = arr.every((elem, index, array) =>
      isEqual(elem, array[0]),
    );

    if (!arr_iguales) {
      throw new Error('LAS RESPUESTA DE XPATH SON DIFERENTES');
    }
  }

  async iniciar_busqueda(
    sorteo_a_buscar: SorteoABuscar,
  ): Promise<RESPONSE_BY_XPATH> {
    const fecha_a_buscar = this.fecha_actual();
    let numero_a_publicar: number[];
    let fecha_a_publicar: string;
    let message_error: string;

    for (let i = 0; i < sorteo_a_buscar.numeros_intentos; i++) {
      try {
        const data_xpath = await this.web_scraping_by_xpath(
          sorteo_a_buscar,
          fecha_a_buscar,
        );
        const data_xpath_1 = data_xpath[0];

        if (!data_xpath_1.error) {
          if (fecha_a_buscar == data_xpath_1.data_by_xpath_fecha) {
            numero_a_publicar = data_xpath_1.data_by_xpath_digitos;
            fecha_a_publicar = data_xpath_1.data_by_xpath_fecha;
            break;
          } else {
            message_error = 'NO ES LA FECHA A BUSCAR';
          }
        } else {
          message_error = data_xpath_1.message;
        }
      } catch (error) {
        message_error = error;
        this.logger.log(`ERROR => ${message_error}`);
      }
      this.logger.log(`STATUS => ${message_error}`);
      await this.bloquearPrograma(sorteo_a_buscar.tiempo_de_espera_segundos);
    }
    if (numero_a_publicar && fecha_a_publicar) {
      return {
        data_by_xpath_digitos: numero_a_publicar,
        data_by_xpath_fecha: fecha_a_publicar,
        error: false,
        message: 'SE ENCONTRO EL XPATH',
      };
    } else {
      return {
        error: true,
        data_by_xpath_digitos: [],
        data_by_xpath_fecha: '',
        message: message_error,
      };
    }
  }

  //? Aqui instancio todos los xpath de un sorteo
  async web_scraping_by_xpath(
    sorteo_a_buscar: SorteoABuscar,
    fecha_a_buscar: string,
  ): Promise<RESPONSE_BY_XPATH[]> {
    const elementos_a_instanciar: RESPONSE_BY_XPATH[] = [];

    for (const xpath_actual of sorteo_a_buscar.xpath) {
      const instancia = new WebScrapingXpathService();
      if (xpath_actual.activo) {
        const init = await instancia.iniciar_proceso_xpath(
          xpath_actual,
          fecha_a_buscar,
        );
        elementos_a_instanciar.push(init);
      }
    }
    const data = await Promise.all(elementos_a_instanciar);
    this.comprobar_arreglos_iguales_sin_errores(data);
    return data;
  }
}
