import { Test, TestingModule } from '@nestjs/testing';
import { ApiLotenetService } from './api-lotenet.service';

describe('ApiLotenetService', () => {
  let service: ApiLotenetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiLotenetService],
    }).compile();

    service = module.get<ApiLotenetService>(ApiLotenetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
