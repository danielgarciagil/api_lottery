import { Test, TestingModule } from '@nestjs/testing';
import { GenerarResultadosService } from './generar-resultados.service';

describe('GenerarResultadosService', () => {
  let service: GenerarResultadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerarResultadosService],
    }).compile();

    service = module.get<GenerarResultadosService>(GenerarResultadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
