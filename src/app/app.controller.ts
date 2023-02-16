import { Controller, Get } from '@nestjs/common';

//Propio
import { AppService } from './app.service';
import { ResponsePropio } from 'src/common/response';
import { WebScrapingXpathService } from 'src/components/web-scraping/web-scraping-xpath.service';

@Controller('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly webScraping: WebScrapingXpathService,
  ) {}

  @Get('healthcheck')
  async healthcheck(): Promise<ResponsePropio> {
    await this.webScraping.startDriver();
    return this.appService.healthcheck();
  }
}
