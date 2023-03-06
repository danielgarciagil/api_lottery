import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//PROPIO
import { TelegramService } from './telegram.service';
import { TelegramUser } from './entities/user_telegram.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TelegramUser])],
  providers: [TelegramService],
})
export class TelegramModule {}
