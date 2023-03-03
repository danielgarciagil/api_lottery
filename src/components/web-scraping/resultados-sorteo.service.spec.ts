import { Test, TestingModule } from '@nestjs/testing';
import { ResultadosSorteoService } from './resultados-sorteo.service';

describe('ResultadosSorteoService', () => {
  let service: ResultadosSorteoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultadosSorteoService],
    }).compile();

    service = module.get<ResultadosSorteoService>(ResultadosSorteoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
