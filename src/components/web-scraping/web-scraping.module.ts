import { Module } from '@nestjs/common';

//PROPIO
import { WebScrapingXpathService } from './web-scraping-xpath.service';
import { WebScrapingResolver } from './web-scraping.resolver';
import { XpathModule } from './../xpath/xpath.module';

@Module({
  imports: [XpathModule],
  providers: [WebScrapingResolver, WebScrapingXpathService],
  exports: [WebScrapingXpathService],
})
export class WebScrapingModule {}
