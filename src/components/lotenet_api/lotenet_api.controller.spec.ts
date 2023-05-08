import { Test, TestingModule } from '@nestjs/testing';
import { LotenetApiController } from './lotenet_api.controller';

describe('LotenetApiController', () => {
  let controller: LotenetApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LotenetApiController],
    }).compile();

    controller = module.get<LotenetApiController>(LotenetApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
