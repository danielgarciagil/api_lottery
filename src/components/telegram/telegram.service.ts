import * as path from 'path';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

// Especifica la ruta al archivo .env
const envPath = path.resolve(
  __dirname,
  '..',
  '..',
  `.env.${process.env.NODE_ENV || 'DEV'}`,
);

config({ path: envPath });

@Injectable()
export class TelegramService implements OnModuleInit {
  private readonly configService = new ConfigService();

  async prueba() {
    console.log('SE INRTANCIO UN BOT');
    const token = this.configService.get('API_NOTIFICACIONES');
    const bot = new Telegraf(token);
    bot.start((ctx) => {
      ctx.reply('Hola');
    });
    bot.launch();
  }

  async onModuleInit() {
    this.prueba();
  }
}
