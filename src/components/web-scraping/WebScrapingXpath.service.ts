import { Injectable } from '@nestjs/common';
import { By, WebDriver, until, Builder } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';

//PROPIO
import { RESPONSE_BY_XPATH } from './../../common/response';
import { validarFecha } from './../../common/validar_fechas';
import { Xpath } from '../xpath/entities/xpath.entity';

@Injectable()
export class WebScrapingXpathService {
  private driver: WebDriver;

  async startDriver() {
    try {
      const options = new ChromeOptions();
      options.addArguments('--disable-extensions');
      options.addArguments('--disable-gpu');
      options.addArguments('--no-sandbox');
      options.addArguments('--disable-dev-shm-usage');
      options.headless();

      this.driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
    } catch (error) {
      this.driver = null;
    }
  }

  async stopDriver() {
    if (this.driver) {
      await this.driver.quit();
      this.driver = null;
    }
  }

  validar_que_es_un_numero(numero): number {
    if (!isNaN(Number(numero))) {
      return numero;
    } else {
      throw new Error('ESTE XPATH NO ES UN NUMERO');
    }
  }

  validar_fechas_iguales(arr_fecha: string[]): string {
    const todas_fechas_iguales = arr_fecha.every((elemento, indice, arr) => {
      return elemento === arr[0];
    });
    if (todas_fechas_iguales) {
      return arr_fecha[0].slice(0, 10); //aqui corto la longitud de la fecha
    } else {
      throw Error('Una de las fechas eran diferentes');
    }
  }

  //Esta sera la funcion padre para bsucar toda la data de un xpath valido
  async iniciar_proceso_xpath(xpath: Xpath): Promise<RESPONSE_BY_XPATH> {
    try {
      await this.startDriver();
      this.validar_driver();
      const data_xpath_digitos: number[] = [];
      const data_xpath_fechas: string[] = [];
      let fecha_final = '';

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
        );
        data_xpath_fechas.push(fecha_xpath);
      }

      fecha_final = this.validar_fechas_iguales(data_xpath_fechas);

      this.stopDriver();
      return {
        message: 'SE ENCONTRO LA DATA DEL XPATH',
        data_by_xpath_digitos: data_xpath_digitos,
        data_by_xpath_fecha: fecha_final,
        error: false,
      };
    } catch (error) {
      this.stopDriver();
      return {
        error: true,
        message: error,
        data_by_xpath_digitos: [],
        data_by_xpath_fecha: '',
      };
    }
  }

  //? Aqui busco el string de la data de la fecha
  async for_fechas_xpath(
    index_actual: number,
    arr_xpath_fechas: string[][],
  ): Promise<string> {
    const driverActual = this.driver;
    this.validar_driver();
    for (const xpath_Actual_fecha of arr_xpath_fechas[index_actual]) {
      try {
        const xpath_fecha = await driverActual.wait(
          until.elementLocated(By.xpath(xpath_Actual_fecha)),
          10000,
          '',
          2000,
        );
        const value_fecha = await xpath_fecha.getText();
        return validarFecha(value_fecha);
      } catch (error) {
        throw new Error('ESTE XPATH DE FECHA NO PUEDE SER ENCONTRADO');
      }
    }
  }

  //? Aqui Buscos los datos de los XPATH de los digitos
  async for_digitos_xpath(
    index_actual: number,
    arr_xpath_digitos: string[][],
  ): Promise<number> {
    let digito = '';
    const driverActual = this.driver;
    this.validar_driver();
    for (const xpath_digito_actual of arr_xpath_digitos[index_actual]) {
      try {
        const message = await driverActual.wait(
          until.elementLocated(By.xpath(xpath_digito_actual)),
          10000,
          '',
          2000,
        );
        const value = await message.getText();
        digito += value;
      } catch (error) {
        throw new Error('ESTE XPATH DE DIGITO NO PUEDE SER ENCONTRADO');
      }
    }
    return this.validar_que_es_un_numero(digito);
  }

  //? Aqui visito las diferentes URL por digitos
  async for_urls_digitos(index_actual: number, arr_urls_digitos: string[][]) {
    const driverActual = this.driver;
    this.validar_driver();
    for (const url of arr_urls_digitos[index_actual]) {
      driverActual.manage().setTimeouts({ implicit: 500 });
      await this.driver.get(url);
    }
  }

  validar_driver() {
    if (!this.driver) {
      throw Error('El driver no existe');
    }
  }
}
