import { Test, TestingModule } from '@nestjs/testing';
import { ResponseSorteoABuscarService } from './response_sorteo_a_buscar.service';

describe('ResponseSorteoABuscarService', () => {
  let service: ResponseSorteoABuscarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseSorteoABuscarService],
    }).compile();

    service = module.get<ResponseSorteoABuscarService>(ResponseSorteoABuscarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
