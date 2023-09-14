import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Injectable()
export class TelegramServiceInit implements OnModuleInit {
  constructor(private readonly telegramService: TelegramService) {}
  private logger: Logger = new Logger('Cron-Services');

  async onModuleInit() {
    this.logger.debug('INICIO EL BOT DE TELEGRAM DE NOTIFICACIONES');
    await this.telegramService.init();
    await this.telegramService.sendNotificaciones({
      error: false,
      message: 'SE REINICIO EL SERVER',
    });
  }
}
