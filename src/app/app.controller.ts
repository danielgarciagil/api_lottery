import { Controller, Get } from '@nestjs/common';

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
  async get(): Promise<ResponsePropio> {
    return this.appService.healthcheck();
  }
}
