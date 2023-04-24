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
      options.addArguments('--disable-application-cache');
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

      //const capabilities = Capabilities.chrome().set(
      //  'chromeVersion',
      //  '112.0.5615.49',
      //);

      this.driver = await new Builder()
        //.withCapabilities(capabilities)
        .forBrowser(Browser.CHROME)
        .setChromeOptions(options)
        .build();
      await this.driver.manage().deleteAllCookies();
      await this.driver.executeScript('window.sessionStorage.clear();');
      await this.driver.executeScript('window.localStorage.clear();');
      await this.driver.executeScript('window.applicationCache.clear();');
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
        10000,
        '',
        10000,
      );
    } catch (error) {
      throw Error(`NO SE ENCONTRO ESTE XPATH ${xpath}`);
    }
  }

  async getUrl(url: string) {
    try {
      // Establecer un tiempo límite de carga de la página
      await this.driver.manage().setTimeouts({ pageLoad: 5000 });
      // Cargar una página web
      await this.driver.get(url);
    } catch (e) {
      if (e.toString().includes('TimeoutError')) {
        // Detener la carga de la página web
        await this.driver.executeScript('window.stop();');
        // Cargar la página web de nuevo
        await this.driver.get(url);
      } else {
        throw e;
      }
    }
  }

  async navigateTo(url: string) {
    const pageLoadTimeout = 20000; // 20 segundos
    const pageLoadPromise = this.getUrl(url);
    //const pageLoadPromise = this.driver.get(url);

    let timeoutId: NodeJS.Timeout;
    const timeoutPromise = new Promise((_resolve, reject) => {
      timeoutId = setTimeout(() => {
        clearTimeout(timeoutId);
        reject(
          new Error(
            `Tiempo de espera agotado pasaron 20 segundos para la URL: ${url}`,
          ),
        );
      }, pageLoadTimeout);
    });

    try {
      await Promise.race([pageLoadPromise, timeoutPromise]);
      clearTimeout(timeoutId);
    } catch (error) {
      throw new Error(`NO SE PUDO ACCEDER A ${url}: ${error.message}`);
    }
  }

  returnDriver() {
    return this.driver;
  }
}
