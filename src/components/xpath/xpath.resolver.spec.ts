import { Test, TestingModule } from '@nestjs/testing';
import { XpathResolver } from './xpath.resolver';
import { XpathService } from './xpath.service';

describe('XpathResolver', () => {
  let resolver: XpathResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XpathResolver, XpathService],
    }).compile();

    resolver = module.get<XpathResolver>(XpathResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
