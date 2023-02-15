import { Test, TestingModule } from '@nestjs/testing';
import { WebScrapingXpathService } from './web-scraping-xpath.service';

describe('WebScrapingXpathService', () => {
  let service: WebScrapingXpathService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebScrapingXpathService],
    }).compile();

    service = module.get<WebScrapingXpathService>(WebScrapingXpathService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
