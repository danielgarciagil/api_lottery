import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//PROPIO
import { TelegramUser } from './entities/user_telegram.entity';
import { CreateUserTelegram } from './dto/create-user_telegram.input';

@Injectable()
export class UserTelegramService {
  private readonly logger = new Logger('USER_TELEGRAM-SERVICE');
  constructor(
    @InjectRepository(TelegramUser)
    private readonly telegramUserRepository: Repository<TelegramUser>,
  ) {}

  async findOneIdUser(idUser: number): Promise<TelegramUser> {
    return await this.telegramUserRepository.findOneBy({
      user_id: idUser,
    });
  }

  async findAll(): Promise<TelegramUser[]> {
    return await this.telegramUserRepository.find();
  }

  async create(user_telegram: CreateUserTelegram): Promise<TelegramUser> {
    const user = await this.findOneIdUser(user_telegram.user_id);
    if (user) return;
    try {
      const newUser = this.telegramUserRepository.create({
        user_id: user_telegram.user_id,
      });
      return await this.telegramUserRepository.save(newUser);
    } catch (error) {
      this.logger.error(error?.message);
    }
  }
}
