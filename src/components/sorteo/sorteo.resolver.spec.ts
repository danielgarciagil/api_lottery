import { Test, TestingModule } from '@nestjs/testing';
import { SorteoResolver } from './sorteo.resolver';
import { SorteoService } from './sorteo.service';

describe('SorteoResolver', () => {
  let resolver: SorteoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SorteoResolver, SorteoService],
    }).compile();

    resolver = module.get<SorteoResolver>(SorteoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
