import { Test, TestingModule } from '@nestjs/testing';
import { JuegoResolver } from './juego.resolver';
import { JuegoService } from './juego.service';

describe('JuegoResolver', () => {
  let resolver: JuegoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JuegoResolver, JuegoService],
    }).compile();

    resolver = module.get<JuegoResolver>(JuegoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
