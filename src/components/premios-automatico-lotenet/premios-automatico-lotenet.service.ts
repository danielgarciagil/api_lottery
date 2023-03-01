import { Injectable, OnModuleInit } from '@nestjs/common';
import { ApiLotenetService } from './api-lotenet.service';

@Injectable()
export class PremiosAutomaticoLotenetService implements OnModuleInit {
  constructor(private readonly apiLotenet: ApiLotenetService) {}

  async onModuleInit() {
    console.log('PREMIOS AUTOMATICO');
    const url =
      'https://dev_admin.orkapi.net:6443/sorteos/buscar_por_fecha/2023-03-01?detallado=true';
    const username = 'luisgarcia';
    const password = '12121212';
    this.apiLotenet.obtener_token(url, username, password);
  }
}
