import { Test, TestingModule } from '@nestjs/testing';
import { PlataformaResolver } from './plataforma.resolver';
import { PlataformaService } from './plataforma.service';

describe('PlataformaResolver', () => {
  let resolver: PlataformaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlataformaResolver, PlataformaService],
    }).compile();

    resolver = module.get<PlataformaResolver>(PlataformaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
