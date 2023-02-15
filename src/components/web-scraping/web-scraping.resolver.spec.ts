import { Test, TestingModule } from '@nestjs/testing';
import { WebScrapingResolver } from './web-scraping.resolver';

describe('WebScrapingResolver', () => {
  let resolver: WebScrapingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebScrapingResolver],
    }).compile();

    resolver = module.get<WebScrapingResolver>(WebScrapingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
