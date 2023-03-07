import {
  By,
  WebDriver,
  until,
  Builder,
  Browser,
  Capabilities,
} from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';

export class SeleniumWebdriver {
  private driver: WebDriver;

  async startDriver(headless: boolean) {
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
      if (!headless) {
        options.headless();
      }

      const capabilities = Capabilities.chrome().set(
        'chromeVersion',
        '110.0.5481.178',
      );

      this.driver = await new Builder()
        .withCapabilities(capabilities)
        .forBrowser(Browser.CHROME)
        .setChromeOptions(options)
        .build();
    } catch (error) {
      throw new Error(`EL NAVEGADOR DIO ERROR AL ABRIR ${error?.message}`);
    }
  }

  async stopDriver() {
    try {
      if (this.driver) {
        await this.driver.quit();
        this.driver = null;
      }
    } catch (error) {
      console.log('NO SE PUDO CERRAR EL NAVEGADOR');
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

  async navigateTo(url: string) {
    try {
      await this.driver.get(url);
    } catch (error) {
      throw Error(`NO SE PUDO ACCEDER A  ${url}`);
    }
  }

  returnDriver() {
    return this.driver;
  }
}
