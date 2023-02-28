import { Test, TestingModule } from '@nestjs/testing';
import { PasarDataService } from './pasar-data.service';

describe('PasarDataService', () => {
  let service: PasarDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasarDataService],
    }).compile();

    service = module.get<PasarDataService>(PasarDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
