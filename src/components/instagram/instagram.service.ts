import { Injectable, OnModuleInit } from '@nestjs/common';
import { SeleniumWebdriver } from '../selenium/selenium-webdriver';
import { pausaBySeg } from 'src/common';

function generarNumeroAleatorio(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

@Injectable()
export class InstagramService implements OnModuleInit {
  async ig() {
    const user = '';
    const password = 'Negro19975';
    const url_publicacion = 'https://www.instagram.com/p/Cpx8geYjyQt/';
    //const url_publicacion =
    //('https://www.instagram.com/p/BrV2kc0DTOasATSFuyHKrQqUsbYyaX9DU2cCV40/');

    const xpath_user =
      '/html/body/div[2]/div/div/div[1]/div/div/div/div[1]/section/main/article/div[2]/div[1]/div[2]/form/div/div[1]/div/label/input';

    const xpath_password =
      '/html/body/div[2]/div/div/div[1]/div/div/div/div[1]/section/main/article/div[2]/div[1]/div[2]/form/div/div[2]/div/label/input';

    const boton_iniciar =
      '/html/body/div[2]/div/div/div[1]/div/div/div/div[1]/section/main/article/div[2]/div[1]/div[2]/form/div/div[3]';

    const selenium = new SeleniumWebdriver();
    //const mensaje_a_enviar = ['avylana', 'carlosdiazz08'];
    const mensaje_a_enviar = '@avylana @carlosdiazz08';

    const input_mensaje =
      '/html/body/div[2]/div/div/div[1]/div/div/div/div[1]/div[1]/div[2]/section/main/div[1]/div[1]/article/div/div[2]/div/div[2]/section[3]/div/form/div/textarea';

    const btn_mandar_ms =
      '/html/body/div[2]/div/div/div[1]/div/div/div/div[1]/div[1]/div[2]/section/main/div[1]/div[1]/article/div/div[2]/div/div[2]/section[3]/div/form/div/div[2]/div';

    await selenium.startDriver(true);
    await selenium.getUrl('https://www.instagram.com/');

    const user_input = await selenium.buscar_xpath(xpath_user);
    await user_input.sendKeys(user);
    await pausaBySeg(2);
    const password_input = await selenium.buscar_xpath(xpath_password);
    await password_input.sendKeys(password);
    await pausaBySeg(2);
    const init = await selenium.buscar_xpath(boton_iniciar);
    await init.click();
    await pausaBySeg(10);
    await selenium.getUrl(url_publicacion);
    await pausaBySeg(10);
    for (let i = 0; i < 500; i++) {
      try {
        const btn = await selenium.buscar_xpath(input_mensaje);
        await pausaBySeg(2);
        //for (const name of mensaje_a_enviar) {
        //  await btn.sendKeys('@');
        //  await pausaBySeg(1);
        //  for (const letra of name) {
        //    await btn.sendKeys(letra);
        //    await pausaBySeg(1);
        //  }
        //  await btn.sendKeys('', Key.ENTER);
        //  await btn.sendKeys('', Key.ENTER);
        //  await btn.sendKeys(' ');
        //}
        await btn.sendKeys(mensaje_a_enviar);

        const btn2 = await selenium.buscar_xpath(btn_mandar_ms);
        await btn2.click();
        console.log('Listo');
        await pausaBySeg(generarNumeroAleatorio(30, 100));
      } catch (error) {
        console.log('paso un error');
        await pausaBySeg(10);
        console.log(error);
      }
    }
    console.log('Termine');
  }

  onModuleInit() {
    console.log('Instagram init');
    //this.ig();
  }
}
