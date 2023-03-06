import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TelegramUser } from './entities/user_telegram.entity';
import { Repository } from 'typeorm';
import { CreateUserTelegram } from './dto/create-user_telegram.input';

@Injectable()
export class UserTelegramService {
  constructor(
    @InjectRepository(TelegramUser)
    private readonly telegramUserRepository: Repository<TelegramUser>,
  ) {}

  async findOneIdUser(idUser: number): Promise<TelegramUser> {
    return await this.telegramUserRepository.findOneBy({
      user_id: idUser,
    });
  }

  async create(user_telegram: CreateUserTelegram) {
    const user = this.findOneIdUser(user_telegram.user_id);
    if (!user) return;
    console.log('object');
  }
}
