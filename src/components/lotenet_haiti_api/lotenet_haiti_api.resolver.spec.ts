import { Test, TestingModule } from '@nestjs/testing';
import { LotenetHaitiApiResolver } from './lotenet_haiti_api.resolver';
import { LotenetHaitiApiService } from './lotenet_haiti_api.service';

describe('LotenetHaitiApiResolver', () => {
  let resolver: LotenetHaitiApiResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LotenetHaitiApiResolver, LotenetHaitiApiService],
    }).compile();

    resolver = module.get<LotenetHaitiApiResolver>(LotenetHaitiApiResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
