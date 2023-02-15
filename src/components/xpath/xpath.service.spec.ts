import { Test, TestingModule } from '@nestjs/testing';
import { XpathService } from './xpath.service';

describe('XpathService', () => {
  let service: XpathService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XpathService],
    }).compile();

    service = module.get<XpathService>(XpathService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
