import { Test, TestingModule } from '@nestjs/testing';
import { LoteriaResolver } from './loteria.resolver';
import { LoteriaService } from './loteria.service';

describe('LoteriaResolver', () => {
  let resolver: LoteriaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoteriaResolver, LoteriaService],
    }).compile();

    resolver = module.get<LoteriaResolver>(LoteriaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
