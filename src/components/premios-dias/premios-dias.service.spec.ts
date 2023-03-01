import { Test, TestingModule } from '@nestjs/testing';
import { PremiosDiasService } from './premios-dias.service';

describe('PremiosDiasService', () => {
  let service: PremiosDiasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PremiosDiasService],
    }).compile();

    service = module.get<PremiosDiasService>(PremiosDiasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
