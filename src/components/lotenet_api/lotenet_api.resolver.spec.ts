import { Test, TestingModule } from '@nestjs/testing';
import { LotenetApiResolver } from './lotenet_api.resolver';
import { LotenetApiService } from './lotenet_api.service';

describe('LotenetApiResolver', () => {
  let resolver: LotenetApiResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LotenetApiResolver, LotenetApiService],
    }).compile();

    resolver = module.get<LotenetApiResolver>(LotenetApiResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
