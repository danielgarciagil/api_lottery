import { Injectable, OnModuleInit } from '@nestjs/common';
import { ApiLotenetService } from './api-lotenet.service';
import { LotenetPremio } from '../lotenet-premios/entities/lotenet-premio.entity';
import { Plataforma } from '../plataforma/entities/plataforma.entity';

@Injectable()
export class PremiosAutomaticoLotenetService implements OnModuleInit {
  constructor(private readonly apiLotenet: ApiLotenetService) {}

  async onModuleInit() {
    console.log('PREMIOS AUTOMATICO');

    const plataforma: Plataforma = {
      descripcion: 'PRUEBA DESARROLLO',
      id: 1,
      name: 'DESARROLLO',
      password: '12121212',
      usuario: 'dsdsds',
      url: '',
    };

    this.apiLotenet.iniciar_seccion(plataforma); //todo quede aqui
  }
}
