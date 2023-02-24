import { Test, TestingModule } from '@nestjs/testing';
import { ResponseSorteoABuscarResolver } from './response_sorteo_a_buscar.resolver';
import { ResponseSorteoABuscarService } from './response_sorteo_a_buscar.service';

describe('ResponseSorteoABuscarResolver', () => {
  let resolver: ResponseSorteoABuscarResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseSorteoABuscarResolver, ResponseSorteoABuscarService],
    }).compile();

    resolver = module.get<ResponseSorteoABuscarResolver>(ResponseSorteoABuscarResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
