import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//PROPIO
//import { TelegramServiceInit } from './telegram-init.service';
import { TelegramService } from './telegram.service';
import { TelegramUser } from './entities/user_telegram.entity';
import { UserTelegramService } from './user_telegram.service';

@Module({
  imports: [TypeOrmModule.forFeature([TelegramUser])],
  providers: [TelegramService, UserTelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
