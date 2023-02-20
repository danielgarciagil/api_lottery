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
import { validarFecha } from './../../common/validar_fechas';
import { Xpath } from '../xpath/entities/xpath.entity';

@Injectable()
export class WebScrapingXpathService {
  private driver: WebDriver;
  private intentos: number;
  private tiempo_de_espera: number;

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

  //Esta sera la funcion padre para bsucar el numero al relaizar el webscraping
  async buscar(xpath: Xpath): Promise<RESPONSE_ALLS_XPATH> {
    console.log(this.intentos);
    console.log(this.tiempo_de_espera);
    //const xpath = await this.xpathService.findOne(id_xpath);
    if (!xpath.activo) {
      throw new UnprocessableEntityException(
        MESSAGE.COMUN_ESTE_ELEMENTO_ESTA_INACTIVO,
      );
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
    const driverActual = this.driver;
    const data_xpath_digitos: number[] = [];
    const data_xpath_fechas: string[] = [];
    let digito = '';
    let fecha_final = '';
    for (let index = 0; index < ALLS_XPATH.longitud_arr; index++) {
      //? Aqui visito las URL
      for (const url of ALLS_XPATH.xpath_urls_by_digitos[index]) {
        driverActual.manage().setTimeouts({ implicit: 500 });
        await this.driver.get(url);
      }

      //? Aqui Buscos los datos de los XPATH de los digitos
      digito = '';
      for (const xpath_actual of ALLS_XPATH.xpath_digitos[index]) {
        const message = await driverActual.wait(
          until.elementLocated(By.xpath(xpath_actual)),
          10000,
          'Se agoto el tiempo para encontrar el xpath de la posicion',
          2000,
        );
        const value = await message.getText();
        digito += value;
      }
      this.validar_que_es_un_numero(digito);
      data_xpath_digitos.push(Number(digito));

      //? Aqui busco el string de la data de la fecha
      for (const xpath_Actual_fecha of ALLS_XPATH.xpath_fecha_by_digito[
        index
      ]) {
        const xpath_fecha = await driverActual.wait(
          until.elementLocated(By.xpath(xpath_Actual_fecha)),
          10000,
          'Se agoto el tiempo para encontrar el xpath del tiempo',
          2000,
        );
        const value_fecha = await xpath_fecha.getText();
        const newFechaFormart = validarFecha(value_fecha);
        data_xpath_fechas.push(newFechaFormart);
      }
      const todas_fechas_iguales = data_xpath_fechas.every(
        (elemento, indice, arr) => {
          return elemento === arr[0];
        },
      );
      if (todas_fechas_iguales) {
        fecha_final = data_xpath_fechas[0].slice(0, 10);
      } else {
        console.log('Una de las fechas eran diferentes');
        throw Error('Una de las fechas eran diferentes');
      }
    }

    return {
      xpath_digitos: data_xpath_digitos,
      xpath_fecha: fecha_final, //TODO
      error: false,
      message: 'Se encontro Bien en el XPATH',
    };
  }

  validar_que_es_un_numero(numero): number {
    if (!isNaN(Number(numero))) {
      return numero;
    } else {
      console.log('ESTE XPATH NO PERTENECE A UN NUMERO');
      throw new UnprocessableEntityException(MESSAGE.ESTE_XPATH_NO_ES_NUMERO);
    }
  }
}

//await this.bloquearPrograma(2);
//async bloquearPrograma(time: number) {
//  console.log('Inicio');
//  await new Promise((resolve) => setTimeout(resolve, time * 1000));
//  console.log('Después de 5 segundos');
//}
