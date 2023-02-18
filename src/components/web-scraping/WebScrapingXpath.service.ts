import {
  BadGatewayException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { By, WebDriver, until } from 'selenium-webdriver';

//PROPIO
import { createDriver } from './selenium-webdriver';
import { XpathService } from '../xpath/xpath.service';
import { MESSAGE } from '../../config/messages';
import { ALLS_XPATH, RESPONSE_ALLS_XPATH } from './types/xpath.type';

@Injectable()
export class WebScrapingXpathService {
  private driver: WebDriver;

  constructor(private readonly xpathService: XpathService) {}

  async startDriver() {
    this.driver = await createDriver();
  }

  async stopDriver() {
    if (this.driver) {
      await this.driver.quit();
      this.driver = null;
    }
  }

  getDriver() {
    return this.driver;
  }

  //Esta sera la funcion padre para bsucar el numero al relaizar el webscraping
  async buscar(id_xpath: number): Promise<RESPONSE_ALLS_XPATH> {
    const xpath = await this.xpathService.findOne(id_xpath);

    if (!xpath.activo) {
      return {
        error: true,
        message: MESSAGE.COMUN_ESTE_ELEMENTO_ESTA_INACTIVO,
        xpath_digitos: [],
        xpath_fecha: '',
      };
    }

    const ALLS_XPATH: ALLS_XPATH = {
      xpath_fecha_by_digito: xpath.xpath_fecha_by_digitos,
      xpath_digitos: xpath.xpath_digitos,
      xpath_urls_by_digitos: xpath.xpath_urls_by_digitos,
      longitud_arr: xpath.xpath_urls_by_digitos.length,
    };

    try {
      const data_by_xpath: RESPONSE_ALLS_XPATH = await this.buscar_numeros(
        ALLS_XPATH,
      );
      this.stopDriver();
      return data_by_xpath;
    } catch (error) {
      console.log(error);
      this.stopDriver();
      throw new BadGatewayException(MESSAGE.BUSCANDO_EL_XPATH_DIO_UN_ERROR);
    }
  }

  async buscar_numeros(ALLS_XPATH: ALLS_XPATH): Promise<RESPONSE_ALLS_XPATH> {
    await this.startDriver();
    const driverActual = this.getDriver();
    const data_xpath_digitos: number[] = [];
    let digito = '';
    for (let index = 0; index < ALLS_XPATH.longitud_arr; index++) {
      //? Aqui visito las URL
      for (const url of ALLS_XPATH.xpath_urls_by_digitos[index]) {
        driverActual.manage().setTimeouts({ implicit: 500 });
        console.log(url);
        await this.driver.get(url);
      }

      //? Aqui Buscos los datos de los XPATH de los digitos
      digito = '';
      for (const xpath_actual of ALLS_XPATH.xpath_digitos[index]) {
        const message = await driverActual.wait(
          until.elementLocated(By.xpath(xpath_actual)),
          10000,
          'Se agoto el tiempo para encontrar el xpath',
          2000,
        );
        const value = await message.getText();
        digito += value;
      }
      this.validar_que_es_un_numero(digito);
      data_xpath_digitos.push(Number(digito));
    }

    //? Aqui busco el string de la data de la fecha
    //TODO const xpath_fecha = await driverActual.wait(
    //TODO   until.elementLocated(By.xpath(ALLS_XPATH.xpath_fecha)),
    //TODO   10000,
    //TODO   'Se agoto el tiempo para encontrar el xpath',
    //TODO   2000,
    //TODO );
    //TODOconst value_fecha = await xpath_fecha.getText();

    return {
      xpath_digitos: data_xpath_digitos,
      xpath_fecha: 'value_fecha', //TODO
      error: false,
      message: '',
    };
  }

  validar_que_es_un_numero(numero): number {
    if (!isNaN(Number(numero))) {
      return numero;
    } else {
      throw new UnprocessableEntityException(MESSAGE.ESTE_XPATH_NO_ES_NUMERO);
    }
  }
}
