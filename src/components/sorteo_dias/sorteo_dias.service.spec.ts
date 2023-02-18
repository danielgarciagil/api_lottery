import { Test, TestingModule } from '@nestjs/testing';
import { SorteoDiasService } from './sorteo_dias.service';

describe('SorteoDiasService', () => {
  let service: SorteoDiasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SorteoDiasService],
    }).compile();

    service = module.get<SorteoDiasService>(SorteoDiasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
