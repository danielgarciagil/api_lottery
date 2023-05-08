import { Test, TestingModule } from '@nestjs/testing';
import { LotenetApiService } from './lotenet_api.service';

describe('LotenetApiService', () => {
  let service: LotenetApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LotenetApiService],
    }).compile();

    service = module.get<LotenetApiService>(LotenetApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
