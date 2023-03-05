import { Logger } from '@nestjs/common';
//PROPIO
import { RESPONSE_BY_XPATH } from './../../common/response';
import { validarFecha } from './../../common/validar_fechas';
import { Xpath } from '../xpath/entities/xpath.entity';
import { SeleniumWebdriver } from '../selenium/selenium-webdriver';

export class WebScrapingXpathService {
  private seleniumWebdriver: SeleniumWebdriver;
  private readonly logger = new Logger('WEBSCRAPING-SERVICE');

  validar_que_es_un_numero(numero: any): number {
    const newNumeroo = parseInt(numero);
    if (isNaN(newNumeroo)) {
      throw new Error('ESTE XPATH NO ES UN NUMERO');
    }
    if (newNumeroo >= 0) {
      return newNumeroo;
    } else {
      throw new Error('ESTE XPATH DIO UN NUMERO INFERIOR A 0');
    }
  }

  //Esta sera la funcion padre para bsucar toda la data de un xpath valido
  async iniciar_xpath(
    xpath: Xpath,
    arrFechasHoy: string[],
  ): Promise<RESPONSE_BY_XPATH> {
    try {
      this.seleniumWebdriver = new SeleniumWebdriver();
      await this.seleniumWebdriver.startDriver();
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
  ): Promise<string> {
    for (const xpath_Actual_fecha of arr_xpath_fechas[index_actual]) {
      try {
        const xpath_fecha = await this.seleniumWebdriver.buscar_xpath(
          xpath_Actual_fecha,
        );
        const value_fecha = await xpath_fecha.getText();
        return validarFecha(value_fecha, arrFechasHoy);
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
        const message = await this.seleniumWebdriver.buscar_xpath(
          xpath_digito_actual,
        );
        const value = this.quitar_palabras_de_digitos(await message.getText());
        digito += value; //todo
      } catch (error) {
        throw new Error(
          `ESTE XPATH DE DIGITO NO PUEDE SER ENCONTRADO => ${error?.message}`,
        );
      }
    }
    return this.validar_que_es_un_numero(digito);
  }

  //? Aqui visito las diferentes URL por digitos
  async for_urls_digitos(index_actual: number, arr_urls_digitos: string[][]) {
    try {
      for (const url of arr_urls_digitos[index_actual]) {
        await this.seleniumWebdriver.navigateTo(url);
      }
    } catch (error) {
      throw Error('NO SE PUDO ACEDER A LA URL');
    }
  }

  quitar_palabras_de_digitos(digito: string): string {
    if (digito.includes('1er.')) digito = digito.replace('1er.', '');
    if (digito.includes('2do.')) digito = digito.replace('2do.', '');
    if (digito.includes('3er.')) digito = digito.replace('3er.', '');
    const newDigito = digito.replace(/\D/g, '');
    return newDigito;
  }
}
