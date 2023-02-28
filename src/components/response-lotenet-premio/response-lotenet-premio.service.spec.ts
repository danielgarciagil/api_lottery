import { Test, TestingModule } from '@nestjs/testing';
import { ResponseLotenetPremioService } from './response-lotenet-premio.service';

describe('ResponseLotenetPremioService', () => {
  let service: ResponseLotenetPremioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseLotenetPremioService],
    }).compile();

    service = module.get<ResponseLotenetPremioService>(ResponseLotenetPremioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
