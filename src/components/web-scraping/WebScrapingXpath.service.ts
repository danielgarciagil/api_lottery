import { Logger } from '@nestjs/common';
//PROPIO
import { RESPONSE_BY_XPATH } from './../../common/response';
import { Xpath } from '../xpath/entities/xpath.entity';
import { SeleniumWebdriver } from '../selenium/selenium-webdriver';
import {
  validarFechaQueSeaDeHoy,
  quitar_palabras_de_digitos,
  validar_que_es_un_numero,
  pausaBySeg,
} from './../../common';
export class WebScrapingXpathService {
  private seleniumWebdriver: SeleniumWebdriver;
  private readonly logger = new Logger('WEBSCRAPING-SERVICE');

  //Esta sera la funcion padre para bsucar toda la data de un xpath valido
  async iniciar_xpath(
    xpath: Xpath,
    arrFechasHoy: string[],
  ): Promise<RESPONSE_BY_XPATH> {
    try {
      this.seleniumWebdriver = new SeleniumWebdriver();
      await this.seleniumWebdriver.startDriver(false);
      const data_xpath_digitos: number[] = [];
      const data_xpath_fechas: string[] = [];
      for (let index = 0; index < xpath.xpath_digitos.length; index++) {
        await this.for_urls_digitos(index, xpath.xpath_urls_by_digitos);

        const numero_xpath = await this.for_digitos_xpath(
          index,
          xpath.xpath_digitos,
        );
        data_xpath_digitos.push(numero_xpath);

        const fecha_xpath = await this.for_fechas_xpath(
          index,
          xpath.xpath_fecha_by_digitos,
          arrFechasHoy,
          xpath.verify_string_date,
        );
        data_xpath_fechas.push(fecha_xpath);
      }

      return {
        message: 'SE ENCONTRO LA DATA DEL XPATH',
        data_by_xpath_digitos: data_xpath_digitos,
        data_by_xpath_fecha: data_xpath_fechas,
        error: false,
      };
    } catch (error) {
      //this.logger.error(error?.message);
      throw new Error(error?.message);
    } finally {
      this.seleniumWebdriver.stopDriver();
      this.seleniumWebdriver = null;
      if (global.gc) {
        global.gc();
      }
    }
  }

  //? Aqui busco el string de la data de la fecha
  async for_fechas_xpath(
    index_actual: number,
    arr_xpath_fechas: string[][],
    arrFechasHoy: string[],
    verify_string_date: string,
  ): Promise<string> {
    for (const xpath_Actual_fecha of arr_xpath_fechas[index_actual]) {
      try {
        const xpath_fecha =
          await this.seleniumWebdriver.buscar_xpath(xpath_Actual_fecha);
        const value_fecha = await xpath_fecha.getText();
        const fecha = validarFechaQueSeaDeHoy(value_fecha, arrFechasHoy);

        if (verify_string_date !== null) {
          if (!fecha.includes(verify_string_date)) {
            throw new Error('NO CUMPLE CON EL verify_string_date DEL XPATH');
          }
        }

        return fecha;
      } catch (error) {
        throw new Error(
          `ESTE XPATH DE FECHA NO PUEDE SER ENCONTRADO => ${error?.message}`,
        );
      }
    }
  }

  //? Aqui Buscos los datos de los XPATH de los digitos
  async for_digitos_xpath(
    index_actual: number,
    arr_xpath_digitos: string[][],
  ): Promise<number> {
    let digito = '';
    for (const xpath_digito_actual of arr_xpath_digitos[index_actual]) {
      try {
        const message =
          await this.seleniumWebdriver.buscar_xpath(xpath_digito_actual);
        const value = quitar_palabras_de_digitos(await message.getText());
        digito += value; //todo
      } catch (error) {
        throw new Error(
          `ESTE XPATH DE DIGITO NO PUEDE SER ENCONTRADO => ${error?.message}`,
        );
      }
    }
    return validar_que_es_un_numero(digito);
  }

  //? Aqui visito las diferentes URL por digitos
  async for_urls_digitos(index_actual: number, arr_urls_digitos: string[][]) {
    try {
      for (const url of arr_urls_digitos[index_actual]) {
        await this.seleniumWebdriver.navigateTo(url);
        await pausaBySeg(2); //Todo agrege un tiempo extra
      }
    } catch (error) {
      throw Error(`NO SE PUDO ACEDER A LA URL ${error?.message}`);
    }
  }
}
