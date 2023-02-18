import { Test, TestingModule } from '@nestjs/testing';
import { WebScrapingXpathService } from './proceso_de_sorteo_a_buscar.service';

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
