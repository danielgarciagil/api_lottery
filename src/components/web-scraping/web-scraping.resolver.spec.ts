import { Test, TestingModule } from '@nestjs/testing';
import { Proceso_de_Sorteo_a_Buscar } from './proceso_de_sorteo_a_buscar.resolver';

describe('WebScrapingResolver', () => {
  let resolver: Proceso_de_Sorteo_a_Buscar;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Proceso_de_Sorteo_a_Buscar],
    }).compile();

    resolver = module.get<Proceso_de_Sorteo_a_Buscar>(
      Proceso_de_Sorteo_a_Buscar,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
