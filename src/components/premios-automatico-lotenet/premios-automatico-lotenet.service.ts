import { Injectable, OnModuleInit } from '@nestjs/common';
import { ApiLotenetService } from './api-lotenet.service';
import { LotenetPremio } from '../lotenet-premios/entities/lotenet-premio.entity';
import { Plataforma } from '../plataforma/entities/plataforma.entity';
import { Resultado } from '../resultados/entities/resultado.entity';

@Injectable()
export class PremiosAutomaticoLotenetService implements OnModuleInit {
  constructor(private readonly apiLotenet: ApiLotenetService) {}

  async onModuleInit() {
    console.log('PREMIOS AUTOMATICO');

    const plataforma: Plataforma = {
      descripcion: 'PRUEBA DESARROLLO',
      id: 1,
      name: 'DESARROLLO',
      password: 'demo',
      usuario: 'demo',
      url: 'https://dev_admin.orkapi.net:6443/',
    };

    const resultado: Resultado = {
      activo: true,
      createAt: new Date(),
      fecha: new Date(),
      id: 1,
      numeros_ganadores: [1, 2, 3],
      updateAt: new Date(),
    };

    const lotenetPremio: LotenetPremio = {
      activo: true,
      data_lotenet_id_lottery: 1,
      data_lotenet_name_loteria: 'FLORIDA',
      data_lotenet_name_sorteo: 'FLORIDA',
      id: 1,
      name: 'FLORIDA PREUBA',
      plataforma: plataforma,
      lotenet_numero_digitos_premio: 2,
      lotenet_numero_posiciones_premio: 3,
    };

    this.apiLotenet.iniciar_premio(resultado, lotenetPremio); //todo quede aqui
  }
}
