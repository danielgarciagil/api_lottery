import { Test, TestingModule } from '@nestjs/testing';
import { PremiosDiasResolver } from './premios-dias.resolver';
import { PremiosDiasService } from './premios-dias.service';

describe('PremiosDiasResolver', () => {
  let resolver: PremiosDiasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PremiosDiasResolver, PremiosDiasService],
    }).compile();

    resolver = module.get<PremiosDiasResolver>(PremiosDiasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
