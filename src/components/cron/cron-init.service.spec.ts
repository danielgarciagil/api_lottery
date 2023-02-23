import { Test, TestingModule } from '@nestjs/testing';
import { CronServiceInit } from './cron-init.service';

describe('CronService', () => {
  let service: CronServiceInit;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CronServiceInit],
    }).compile();

    service = module.get<CronServiceInit>(CronServiceInit);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
