import { Test, TestingModule } from '@nestjs/testing';
import { SorteoService } from './sorteo.service';

describe('SorteoService', () => {
  let service: SorteoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SorteoService],
    }).compile();

    service = module.get<SorteoService>(SorteoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
