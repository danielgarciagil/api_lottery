import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { config } from 'dotenv';
import { UserTelegramService } from './user_telegram.service';
import { ResponsePropioGQl } from 'src/common/response';
//import axios from 'axios';

// Especifica la ruta al archivo .env
const envPath = path.resolve(
  __dirname,
  '..',
  '..',
  `.env.${process.env.NODE_ENV || 'DEV'}`,
);

config({ path: envPath });

@Injectable()
export class TelegramService {
  private readonly configService = new ConfigService();
  private bot: Telegraf<Context<Update>>;
  private readonly logger = new Logger('TELEGRAM-SERVICE-INIT');
  constructor(private readonly userTelegramService: UserTelegramService) {
    const token = this.configService.get('API_NOTIFICACIONES');
    this.bot = new Telegraf(token);
    this.bot.launch();
    this.all_cmds();
  }

  //Este es el comando de Start, que es para suscribir los users
  async cmd_start() {
    this.bot.start(async (ctx) => {
      const id_save = String(ctx.from.id);
      this.userTelegramService.create({ user_id: id_save });
      ctx.reply(
        'TE HAS SUSCRISTO AL CANAL DE MENSAJES DE NOTIFICACIONES DE DIZLOTTE',
      );
    });
  }

  //AQUI agrego todos los comandos que configuro
  async all_cmds() {
    this.cmd_start();
  }

  //Esta Funcion me envia un Mensaje al chatId de Telegram
  async sendMessage(chatId: string, message: string) {
    try {
      await this.bot.telegram.sendMessage(chatId, message);
      //const token = this.configService.get('API_NOTIFICACIONES'); // Obtén el token de la variable de entorno
      //if (!token) {
      //  throw new Error(
      //    'El token de Telegram no está configurado en las variables de entorno.',
      //  );
      //}
      //const url = `https://api.telegram.org/bot${token}/sendMessage`;
      //const data = {
      //  chat_id: chatId,
      //  text: message,
      //};
      //await axios.post(url, data);
    } catch (error) {
      this.logger.error(
        `NO SE ENVIO LA NOTIFICACION ERROR =>${error?.message} CHATID => ${chatId}`,
      );
    }
  }

  //Esta funcion es para enviar notificaciones a todos los usuarios que quieran recibir notificaciones
  async sendNotificaciones(message: ResponsePropioGQl) {
    try {
      const user_id_telegram = await this.userTelegramService.findAll();
      for (const user of user_id_telegram) {
        const newMessage = `\nERROR => ${message.error} \n\n${message.message}`;
        await this.sendMessage(user.user_id, newMessage); //todo eso no va aqui
      }
    } catch (error) {
      this.logger.error(`NO SE PUDO ENVIAR NIGNUN MENSAJE ${error?.message}`);
    }
  }

  async init() {}
}
