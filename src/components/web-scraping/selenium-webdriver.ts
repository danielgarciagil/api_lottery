import { Builder, WebDriver } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';

export async function createDriver(): Promise<WebDriver> {
  const options = new ChromeOptions();
  //options.addArguments('--disable-extensions');
  //options.addArguments('--disable-gpu');
  //options.addArguments('--no-sandbox');
  //options.addArguments('--disable-dev-shm-usage');

  return await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
}
