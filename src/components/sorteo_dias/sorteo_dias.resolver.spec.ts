import { Test, TestingModule } from '@nestjs/testing';
import { SorteoDiasResolver } from './sorteo_dias.resolver';
import { SorteoDiasService } from './sorteo_dias.service';

describe('SorteoDiasResolver', () => {
  let resolver: SorteoDiasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SorteoDiasResolver, SorteoDiasService],
    }).compile();

    resolver = module.get<SorteoDiasResolver>(SorteoDiasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
