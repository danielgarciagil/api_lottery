import { Logger } from '@nestjs/common';

//PROPIO
import { LOTENET_XPATH } from './lotenet.enum';
import { Plataforma } from '../plataforma/entities/plataforma.entity';
import { LotenetPremio } from '../lotenet-premios/entities/lotenet-premio.entity';
import { Resultado } from '../resultados/entities/resultado.entity';
import { convertir_formato_date } from '../../common/funciones/validar_fechas';
import { ResponsePropioGQl } from './../../common/response';
import { SeleniumWebdriver } from '../selenium/selenium-webdriver';
import { pausaBySeg } from 'src/common/funciones/bloquearPrograma';

export class ApiLotenetService {
  private seleniumWebdriver: SeleniumWebdriver;
  private readonly logger = new Logger('API-LOTENET-SERVICE');

  async iniciar_seccion(plataforma: Plataforma) {
    await this.seleniumWebdriver.navigateTo(plataforma.url);
    await pausaBySeg(2);

    const btnUsuario = await this.seleniumWebdriver.buscar_xpath(
      LOTENET_XPATH.usuario,
    );
    btnUsuario.sendKeys(plataforma.usuario);

    const btnPassword = await this.seleniumWebdriver.buscar_xpath(
      LOTENET_XPATH.password,
    );
    btnPassword.sendKeys(plataforma.password);

    const btnIniSesion = await this.seleniumWebdriver.buscar_xpath(
      LOTENET_XPATH.iniciar_seccion,
    );
    btnIniSesion.click();

    await pausaBySeg(2);
    const url_actual = await this.seleniumWebdriver
      .returnDriver()
      .getCurrentUrl();

    if (!url_actual.endsWith('/administracion/consorcios/')) {
      throw Error('NO SE PUDO HACER LOGIN EN LOTENET');
    }
  }

  async buscar_sorteo(
    plataforma: Plataforma,
    lotenetPremio: LotenetPremio,
    resultado: Resultado,
  ) {
    await this.seleniumWebdriver.navigateTo(
      `${plataforma.url}/operaciones/premios/`,
    );
    await pausaBySeg(2);

    const url_actual = await this.seleniumWebdriver
      .returnDriver()
      .getCurrentUrl();
    await pausaBySeg(2);

    if (!url_actual.endsWith('/operaciones/premios/')) {
      throw Error('NO SE PUDO ACEDER A LA SESION DE PREMIO');
    }
    await pausaBySeg(2);

    const inputfecha = await this.seleniumWebdriver.buscar_xpath(
      LOTENET_XPATH.input_fecha,
    );
    const fecha = convertir_formato_date(resultado.fecha.toISOString());
    await inputfecha.sendKeys(fecha);
    await pausaBySeg(2);

    const inputLoteria = await this.seleniumWebdriver.buscar_xpath(
      LOTENET_XPATH.input_loteria,
    );
    await inputLoteria.sendKeys(lotenetPremio.data_lotenet_name_loteria);
    await pausaBySeg(2);

    const inputSorteo = await this.seleniumWebdriver.buscar_xpath(
      LOTENET_XPATH.inputt_sorteo,
    );
    await inputSorteo.sendKeys(lotenetPremio.data_lotenet_name_sorteo);
    await pausaBySeg(2);

    const btnByPremio = await this.seleniumWebdriver.buscar_xpath(
      LOTENET_XPATH.primer_premio,
    );
    await btnByPremio.click();
    await pausaBySeg(2);

    const sorSelect = await this.seleniumWebdriver.buscar_xpath(
      LOTENET_XPATH.loteria_select,
    );
    const sorteoApremiar = await sorSelect.getText();
    await pausaBySeg(2);

    if (!sorteoApremiar.endsWith(lotenetPremio.data_lotenet_name_sorteo)) {
      throw Error('NO SE ECONTRO EL SORTEO');
    }
  }

  async colocar_premio(lotenetPremio: LotenetPremio, resultado: Resultado) {
    const btnPremio = await this.seleniumWebdriver.buscar_xpath(
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
      const btnPremio = await this.seleniumWebdriver.buscar_xpath(xpath);
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
      await pausaBySeg(2);
    }

    const btnPremiar = await this.seleniumWebdriver.buscar_xpath(
      LOTENET_XPATH.btn_procesar_prem,
    );
    if ((await btnPremiar.getText()) !== 'Procesar') {
      throw Error('ESTE NO ES EL BOTON DE PROCESAR');
    }
    await btnPremiar.click();
    await pausaBySeg(2);

    const resultadoPage = await this.seleniumWebdriver
      .returnDriver()
      .getPageSource();
    if (!resultadoPage.includes('Resultado guardado')) {
      throw Error('NO SE GUARDO EL PREMIO');
    }
  }

  async iniciar_premio(
    resultado: Resultado,
    lotenetPremio: LotenetPremio,
  ): Promise<ResponsePropioGQl> {
    try {
      this.seleniumWebdriver = new SeleniumWebdriver();
      await this.seleniumWebdriver.startDriver(true);

      await this.iniciar_seccion(lotenetPremio.plataforma);

      await this.buscar_sorteo(
        lotenetPremio.plataforma,
        lotenetPremio,
        resultado,
      );

      await this.colocar_premio(lotenetPremio, resultado);
      return {
        error: false,
        message: 'SE PREMIO CORRECTAMENTE',
      };
    } catch (error) {
      throw new Error(error?.message);
    } finally {
      this.seleniumWebdriver.stopDriver();
      this.seleniumWebdriver = null;

      if (global.gc) {
        global.gc();
      }
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
