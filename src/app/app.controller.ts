import { Controller, Get } from '@nestjs/common';

//Propio
import { AppService } from './app.service';
import { ResponsePropio } from 'src/common/response';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('healthcheck')
  healthcheck(): ResponsePropio {
    return this.appService.healthcheck();
  }
}
