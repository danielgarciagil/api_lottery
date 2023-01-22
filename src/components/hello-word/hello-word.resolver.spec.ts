import { Test, TestingModule } from '@nestjs/testing';
import { HelloWordResolver } from './hello-word.resolver';

describe('HelloWordResolver', () => {
  let resolver: HelloWordResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelloWordResolver],
    }).compile();

    resolver = module.get<HelloWordResolver>(HelloWordResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
