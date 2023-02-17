import { BadGatewayException, Injectable } from '@nestjs/common';
import { By, WebDriver, until } from 'selenium-webdriver';

//PROPIO
import { createDriver } from './selenium-webdriver';
import { XpathService } from './../xpath/xpath.service';
import { ResponsePropioGQl } from './../../common/response';
import { MESSAGE } from './../../config/messages';
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

  async buscar_by_xpath(id_xpath: number): Promise<ResponsePropioGQl> {
    const xpath = await this.xpathService.findOne(id_xpath);
    //todo repeti codigo
    if (!xpath.activo) {
      throw new BadGatewayException(MESSAGE.BUSCANDO_EL_XPATH_DIO_UN_ERROR);
    }
    try {
      const { xpath_digitos, xpath_urls_by_digitos, xpath_fecha_by_digitos } =
        xpath;
      const ALLS_XPATH: ALLS_XPATH = {
        xpath_fecha_by_digito: xpath_fecha_by_digitos,
        xpath_digitos: xpath_digitos,
        xpath_urls_by_digitos: xpath_urls_by_digitos,
      };

      const data_by_xpath: RESPONSE_ALLS_XPATH = await this.buscar_numeros(
        ALLS_XPATH,
      );
      console.log(data_by_xpath);
      this.stopDriver();
      return {
        message: MESSAGE.SE_PUBLICO_CORRECTAMENTE_EL_XPATHL,
        status: 200,
      };
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

    //TODO //? Aqui visito las URL
    //TODO for (const url of urls) {
    //TODO   driverActual.manage().setTimeouts({ implicit: 500 });
    //TODO   await this.driver.get(url);
    //TODO }

    //? Aqui Buscos los datos de los XPATH de los digitos
    for (const posicion_actual of ALLS_XPATH.xpath_digitos) {
      let digito = '';
      for (const xpath_actual of posicion_actual) {
        const message = await driverActual.wait(
          until.elementLocated(By.xpath(xpath_actual)),
          10000,
          'Se agoto el tiempo para encontrar el xpath',
          2000,
        );
        const value = await message.getText();
        digito += value;
      }
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
    };
  }
}
