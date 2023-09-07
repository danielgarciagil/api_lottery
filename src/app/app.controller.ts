import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';

//Propio
import { AppService } from './app.service';
import { ResponsePropio } from 'src/common/response';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('app/healthcheck')
  async healthcheck(): Promise<ResponsePropio> {
    return this.appService.healthcheck();
  }

  @Get('')
  //async get(): Promise<ResponsePropio> {
  //  return this.appService.healthcheck();
  //}
  serveHtml(@Res() res: Response) {
    const htmlContent = fs.readFileSync('../../public/index.html', 'utf8'); // Reemplaza 'ruta_al_archivo.html' con la ruta real de tu archivo HTML
    res.send(htmlContent);
  }
}
