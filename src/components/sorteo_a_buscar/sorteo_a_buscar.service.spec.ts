import { Test, TestingModule } from '@nestjs/testing';
import { SorteoABuscarService } from './sorteo_a_buscar.service';

describe('SorteoABuscarService', () => {
  let service: SorteoABuscarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SorteoABuscarService],
    }).compile();

    service = module.get<SorteoABuscarService>(SorteoABuscarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
