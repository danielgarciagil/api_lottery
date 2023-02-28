import { Test, TestingModule } from '@nestjs/testing';
import { LotenetPremiosResolver } from './lotenet-premios.resolver';
import { LotenetPremiosService } from './lotenet-premios.service';

describe('LotenetPremiosResolver', () => {
  let resolver: LotenetPremiosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LotenetPremiosResolver, LotenetPremiosService],
    }).compile();

    resolver = module.get<LotenetPremiosResolver>(LotenetPremiosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
