import { BadGatewayException, Injectable } from '@nestjs/common';
import { By, WebDriver, until } from 'selenium-webdriver';

//PROPIO
import { createDriver } from './selenium-webdriver';
import { XpathService } from './../xpath/xpath.service';
import { ResponsePropioGQl } from './../../common/response';
import { MESSAGE } from './../../config/messages';

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
    try {
      const { urls, xpath_digitos } = xpath;
      const numeros = await this.buscar_numeros(urls, xpath_digitos);
      console.log(numeros);
      return {
        message: MESSAGE.SE_PUBLICO_CORRECTAMENTE_EL_XPATHL,
        status: 200,
      };
    } catch (error) {
      console.log(error);
      throw new BadGatewayException(MESSAGE.BUSCANDO_EL_XPATH_DIO_UN_ERROR);
    }
  }
  //TODO quede aqui61` =-0tyars
  async buscar_numeros(
    urls: string[],
    xpath_numeros: string[][],
  ): Promise<number[]> {
    await this.startDriver();
    const driverActual = this.getDriver();

    const response: number[] = [];

    //? Aqui visito las URL
    for (const url of urls) {
      driverActual.manage().setTimeouts({ implicit: 500 });
      await this.driver.get(url);
    }

    //? Aqui Buscos los Xpath
    for (const posicion_actual of xpath_numeros) {
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
      response.push(Number(digito));
    }
    await this.stopDriver();
    return response;
  }
}
