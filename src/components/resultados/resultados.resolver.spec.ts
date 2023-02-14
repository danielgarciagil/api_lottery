import { Test, TestingModule } from '@nestjs/testing';
import { ResultadosResolver } from './resultados.resolver';
import { ResultadosService } from './resultados.service';

describe('ResultadosResolver', () => {
  let resolver: ResultadosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultadosResolver, ResultadosService],
    }).compile();

    resolver = module.get<ResultadosResolver>(ResultadosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
