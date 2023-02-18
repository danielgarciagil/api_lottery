import { Test, TestingModule } from '@nestjs/testing';
import { SorteoABuscarResolver } from './sorteo_a_buscar.resolver';
import { SorteoABuscarService } from './sorteo_a_buscar.service';

describe('SorteoABuscarResolver', () => {
  let resolver: SorteoABuscarResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SorteoABuscarResolver, SorteoABuscarService],
    }).compile();

    resolver = module.get<SorteoABuscarResolver>(SorteoABuscarResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
