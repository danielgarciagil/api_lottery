import { Test, TestingModule } from '@nestjs/testing';
import { UserTelegramService } from './user_telegram.service';

describe('UserTelegramService', () => {
  let service: UserTelegramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTelegramService],
    }).compile();

    service = module.get<UserTelegramService>(UserTelegramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
