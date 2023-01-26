import { Test, TestingModule } from '@nestjs/testing';
import { ListsItemService } from './lists-item.service';

describe('ListsItemService', () => {
  let service: ListsItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListsItemService],
    }).compile();

    service = module.get<ListsItemService>(ListsItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
