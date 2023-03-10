import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Injectable()
export class TelegramServiceInit implements OnModuleInit {
  private readonly logger = new Logger('TELEGRAM-INIT-SERVICE-INIT');
  constructor(private readonly telegramService: TelegramService) {}

  async onModuleInit() {
    this.telegramService.init();
    this.logger.debug('INICIO EL BOT DE TELEGRAM DE NOTIFICACIONES');
  }
}