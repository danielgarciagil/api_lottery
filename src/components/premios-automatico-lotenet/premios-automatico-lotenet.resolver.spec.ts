import { Test, TestingModule } from '@nestjs/testing';
import { PremiosAutomaticoLotenetResolver } from './premios-automatico-lotenet.resolver';

describe('PremiosAutomaticoLotenetResolver', () => {
  let resolver: PremiosAutomaticoLotenetResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PremiosAutomaticoLotenetResolver],
    }).compile();

    resolver = module.get<PremiosAutomaticoLotenetResolver>(
      PremiosAutomaticoLotenetResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
