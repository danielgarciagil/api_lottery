import { Test, TestingModule } from '@nestjs/testing';
import { ResponseLotenetPremioResolver } from './response-lotenet-premio.resolver';
import { ResponseLotenetPremioService } from './response-lotenet-premio.service';

describe('ResponseLotenetPremioResolver', () => {
  let resolver: ResponseLotenetPremioResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseLotenetPremioResolver, ResponseLotenetPremioService],
    }).compile();

    resolver = module.get<ResponseLotenetPremioResolver>(ResponseLotenetPremioResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
