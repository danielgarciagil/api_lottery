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
    const options = new ChromeOptions();
    options.addArguments('--disable-extensions');
    options.addArguments('--disable-gpu');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('ignore-certificate-errors');
    options.addArguments('--disable-notifications');
    options.addArguments('--disable-popup-blocking');
    options.addArguments('--disable-infobars');
    options.addArguments('--disable-default-apps');
    options.addArguments('--disable-background-networking');
    options.addArguments('--disable-geolocation');
    options.addArguments('--disable-client-side-phishing-detection');
    options.headless();

    this.driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  }

  async stopDriver() {
    if (this.driver) {
      await this.driver.quit();
      this.driver = null;
    }
  }

  async buscar_xpath(xpath: string) {
    try {
      return await this.driver.wait(
        until.elementLocated(By.xpath(xpath)),
        30000,
        '',
        30000,
      );
    } catch (error) {
      throw Error(`NO SE ENCONTRO ESTE XPATH ${xpath}`);
    }
  }

  validar_que_es_un_numero(numero: any): number {
    const newNumeroo = parseInt(numero);
    if (isNaN(newNumeroo)) {
      throw new Error('ESTE XPATH NO ES UN NUMERO');
    }
    if (newNumeroo >= 0) {
      return newNumeroo;
    } else {
      throw new Error('ESTE XPATH DIO UN NUMERO INFERIOOR A 0');
    }
  }

  validar_fechas_iguales(arr_fecha: string[]): string {
    const todas_fechas_iguales = arr_fecha.every((elemento, indice, arr) => {
      return elemento === arr[0];
    });
    if (todas_fechas_iguales) {
      return arr_fecha[0]; //aqui corto la longitud de la fecha
    } else {
      throw Error('Una de las fechas eran diferentes');
    }
  }

  //Esta sera la funcion padre para bsucar toda la data de un xpath valido
  async iniciar_proceso_xpath(
    xpath: Xpath,
    fecha_a_buscar: string,
  ): Promise<RESPONSE_BY_XPATH> {
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
          fecha_a_buscar,
        );
        data_xpath_fechas.push(fecha_xpath);
      }

      fecha_final = this.validar_fechas_iguales(data_xpath_fechas);

      return {
        message: 'SE ENCONTRO LA DATA DEL XPATH',
        data_by_xpath_digitos: data_xpath_digitos,
        data_by_xpath_fecha: fecha_final,
        error: false,
      };
    } catch (error) {
      return {
        error: true,
        message: error,
        data_by_xpath_digitos: [],
        data_by_xpath_fecha: '',
      };
    } finally {
      this.stopDriver();
    }
  }

  //? Aqui busco el string de la data de la fecha
  async for_fechas_xpath(
    index_actual: number,
    arr_xpath_fechas: string[][],
    fecha_a_buscar: string,
  ): Promise<string> {
    for (const xpath_Actual_fecha of arr_xpath_fechas[index_actual]) {
      try {
        const xpath_fecha = await this.buscar_xpath(xpath_Actual_fecha);
        const value_fecha = await xpath_fecha.getText();
        return validarFecha(value_fecha, fecha_a_buscar);
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
    this.validar_driver();
    for (const xpath_digito_actual of arr_xpath_digitos[index_actual]) {
      try {
        const message = await this.buscar_xpath(xpath_digito_actual);
        const value = this.quitar_palabras_de_digitos(await message.getText());
        digito += value; //todo
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
    try {
      for (const url of arr_urls_digitos[index_actual]) {
        driverActual.manage().setTimeouts({ implicit: 500 });
        await this.driver.get(url);
      }
    } catch (error) {
      throw Error('NO SE PUDO ACEDER A LA URL');
    }
  }

  validar_driver() {
    if (!this.driver) {
      throw Error('El driver no existe');
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
