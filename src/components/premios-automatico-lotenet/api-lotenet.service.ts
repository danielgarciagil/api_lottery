import { Injectable } from '@nestjs/common';
import { By, WebDriver, until, Builder } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';

//PROPIO
import { LOTENET_XPATH } from './lotenet.enum';
import { Plataforma } from '../plataforma/entities/plataforma.entity';
import { LotenetPremio } from '../lotenet-premios/entities/lotenet-premio.entity';
import { Resultado } from '../resultados/entities/resultado.entity';
import { convertir_formato_date } from './../../common/validar_fechas';
import { ResponsePropioGQl } from 'src/common/response';

@Injectable()
export class ApiLotenetService {
  private driver: WebDriver;

  async bloquearPrograma(time: number) {
    await new Promise((resolve) => setTimeout(resolve, time * 1000));
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

  async startDriver() {
    try {
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
      //options.headless();

      this.driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();
    } catch (error) {
      throw new Error(`DIO ERROR AL ABRIR EL NAVEGADOR => ${error?.message}`);
    }
  }

  async stopDriver() {
    if (this.driver) {
      await this.driver.quit();
      this.driver = null;
    }
  }

  validar_driver() {
    if (!this.driver) {
      throw Error('El driver no existe');
    }
  }

  async iniciar_seccion(plataforma: Plataforma) {
    await this.driver.get(plataforma.url);
    await this.bloquearPrograma(2);

    const btnUsuario = await this.buscar_xpath(LOTENET_XPATH.usuario);
    btnUsuario.sendKeys(plataforma.usuario);

    const btnPassword = await this.buscar_xpath(LOTENET_XPATH.password);
    btnPassword.sendKeys(plataforma.password);

    const btnIniSesion = await this.buscar_xpath(LOTENET_XPATH.iniciar_seccion);
    btnIniSesion.click();

    await this.bloquearPrograma(2);
    const url_actual = await this.driver.getCurrentUrl();

    if (!url_actual.endsWith('/administracion/consorcios/')) {
      throw Error('NO SE PUDO HACER LOGIN EN LOTENET');
    }
  }

  async buscar_sorteo(
    plataforma: Plataforma,
    lotenetPremio: LotenetPremio,
    resultado: Resultado,
  ) {
    await this.driver.get(`${plataforma.url}/operaciones/premios/`);
    await this.bloquearPrograma(2);
    const url_actual = await this.driver.getCurrentUrl();

    if (!url_actual.endsWith('/operaciones/premios/')) {
      throw Error('NO SE PUDO ACEDER A LA SESION DE PREMIO');
    }
    await this.bloquearPrograma(2);

    const inputfecha = await this.buscar_xpath(LOTENET_XPATH.input_fecha);
    const fecha = convertir_formato_date(resultado.fecha.toISOString());
    await inputfecha.sendKeys(fecha);
    await this.bloquearPrograma(2);

    const inputLoteria = await this.buscar_xpath(LOTENET_XPATH.input_loteria);
    await inputLoteria.sendKeys(lotenetPremio.data_lotenet_name_loteria);

    const inputSorteo = await this.buscar_xpath(LOTENET_XPATH.inputt_sorteo);
    await inputSorteo.sendKeys(lotenetPremio.data_lotenet_name_sorteo);
    await this.bloquearPrograma(2);

    const btnByPremio = await this.buscar_xpath(LOTENET_XPATH.primer_premio);
    await btnByPremio.click();
    await this.bloquearPrograma(2);

    const sorSelect = await this.buscar_xpath(LOTENET_XPATH.loteria_select);
    const sorteoApremiar = await sorSelect.getText();

    if (!sorteoApremiar.endsWith(lotenetPremio.data_lotenet_name_sorteo)) {
      throw Error('NO SE ECONTRO EL SORTEO');
    }
  }

  async colocar_premio(lotenetPremio: LotenetPremio, resultado: Resultado) {
    const btnPremio = await this.buscar_xpath(
      `${LOTENET_XPATH.input_premiar}/tr[1]/td[2]/div/input`,
    );
    if (!(await btnPremio.isEnabled())) {
      throw Error('YA ESTA PREMIADA ESTA LOTERIA');
    }
    if (
      resultado.numeros_ganadores.length !==
      lotenetPremio.lotenet_numero_posiciones_premio
    ) {
      throw Error('ESTE PREMIO NO TIENE LA LONGITUD DE RESULTADOS');
    }

    for (let i = 1; i <= lotenetPremio.lotenet_numero_posiciones_premio; i++) {
      const xpath = `${LOTENET_XPATH.input_premiar}/tr[${i}]/td[2]/div/input`;
      const btnPremio = await this.buscar_xpath(xpath);
      const numero_a_mandar = this.agregar_digitos(
        lotenetPremio.lotenet_numero_digitos_premio,
        resultado.numeros_ganadores[i - 1],
      );
      if (
        numero_a_mandar.length !== lotenetPremio.lotenet_numero_digitos_premio
      ) {
        throw Error('NO SE MANDO CON LOS DIGITOS CORRECTOS');
      }
      btnPremio.sendKeys(numero_a_mandar);
      await this.bloquearPrograma(2);
    }

    const btnPremiar = await this.buscar_xpath(LOTENET_XPATH.btn_procesar_prem);
    if ((await btnPremiar.getText()) !== 'Procesar') {
      throw Error('ESTE NO ES EL BOTON DE PROCESAR');
    }
    await btnPremiar.click();
    await this.bloquearPrograma(2);

    const resultadoPage = await this.driver.getPageSource();
    if (!resultadoPage.includes('Resultado guardado')) {
      throw Error('NO SE GUARDO EL PREMIO');
    }
  }

  async iniciar_premio(
    resultado: Resultado,
    lotenetPremio: LotenetPremio,
  ): Promise<ResponsePropioGQl> {
    try {
      await this.startDriver();
      this.validar_driver();

      await this.iniciar_seccion(lotenetPremio.plataforma);
      this.validar_driver();

      await this.buscar_sorteo(
        lotenetPremio.plataforma,
        lotenetPremio,
        resultado,
      );
      this.validar_driver();

      await this.colocar_premio(lotenetPremio, resultado);
      return {
        error: false,
        message: 'SE PREMIO CORRECTAMENTE',
      };
    } catch (error) {
      throw Error(error);
    } finally {
      this.stopDriver();
    }
  }

  agregar_digitos(numero_digitos: number, numero_premio: number): string {
    if (numero_digitos === numero_premio.toString().length) {
      return numero_premio.toString();
    }
    let newDigito = String(numero_premio);
    const ceros_faltantes = numero_digitos - numero_premio.toString().length;
    for (let i = 0; i < ceros_faltantes; i++) {
      newDigito = '0' + newDigito;
    }
    return newDigito;
  }
}
