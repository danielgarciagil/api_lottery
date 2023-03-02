import { Injectable } from '@nestjs/common';
import { By, WebDriver, until, Builder, Key } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';

//PROPIO
import { LOTENET_XPATH } from './lotenet.enum';
import { Plataforma } from '../plataforma/entities/plataforma.entity';
import { LotenetPremio } from '../lotenet-premios/entities/lotenet-premio.entity';
import { Resultado } from '../resultados/entities/resultado.entity';

@Injectable()
export class ApiLotenetService {
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
    //options.headless();

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

  validar_driver() {
    if (!this.driver) {
      throw Error('El driver no existe');
    }
  }

  async iniciar_seccion(plataforma: Plataforma) {
    const driver = this.driver;
    this.validar_driver();
    await driver.get(plataforma.url);
    await driver.manage().setTimeouts({ implicit: 500 });

    const btnUsuario = await driver.wait(
      until.elementLocated(By.xpath(LOTENET_XPATH.usuario)),
      30000,
      '',
      30000,
    );
    btnUsuario.sendKeys(plataforma.usuario);

    const btnPassword = await driver.wait(
      until.elementLocated(By.xpath(LOTENET_XPATH.password)),
      30000,
      '',
      30000,
    );
    btnPassword.sendKeys(plataforma.password);

    const btnIniciarSession = await driver.wait(
      until.elementLocated(By.xpath(LOTENET_XPATH.iniciar_seccion)),
      30000,
      '',
      30000,
    );
    btnIniciarSession.click();

    await driver.manage().setTimeouts({ implicit: 5000 });
    const url_actual = await driver.getCurrentUrl();
    if (!url_actual.endsWith('/administracion/consorcios/')) {
      throw Error('NO SE PUDO HACER LOGIN EN LOTENET');
    }
  }

  //todoe ste sera elk metood a isntanciar premiar
  async iniciar_premio() {
    try {
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  }
}
