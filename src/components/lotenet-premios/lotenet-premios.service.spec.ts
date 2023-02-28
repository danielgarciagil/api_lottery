import { Test, TestingModule } from '@nestjs/testing';
import { LotenetPremiosService } from './lotenet-premios.service';

describe('LotenetPremiosService', () => {
  let service: LotenetPremiosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LotenetPremiosService],
    }).compile();

    service = module.get<LotenetPremiosService>(LotenetPremiosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
