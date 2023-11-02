import { Test, TestingModule } from '@nestjs/testing';
import { LotenetHaitiApiService } from './lotenet_haiti_api.service';

describe('LotenetHaitiApiService', () => {
  let service: LotenetHaitiApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LotenetHaitiApiService],
    }).compile();

    service = module.get<LotenetHaitiApiService>(LotenetHaitiApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
