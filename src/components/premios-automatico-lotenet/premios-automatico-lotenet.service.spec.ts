import { Test, TestingModule } from '@nestjs/testing';
import { PremiosAutomaticoLotenetService } from './premios-automatico-lotenet.service';

describe('PremiosAutomaticoLotenetService', () => {
  let service: PremiosAutomaticoLotenetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PremiosAutomaticoLotenetService],
    }).compile();

    service = module.get<PremiosAutomaticoLotenetService>(PremiosAutomaticoLotenetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
