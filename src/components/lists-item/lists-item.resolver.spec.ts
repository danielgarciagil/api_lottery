import { Test, TestingModule } from '@nestjs/testing';
import { ListsItemResolver } from './lists-item.resolver';
import { ListsItemService } from './lists-item.service';

describe('ListsItemResolver', () => {
  let resolver: ListsItemResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListsItemResolver, ListsItemService],
    }).compile();

    resolver = module.get<ListsItemResolver>(ListsItemResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
