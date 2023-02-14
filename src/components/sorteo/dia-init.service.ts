import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dias } from './entities/dias.entity';

//PROOPIO

enum VALID_DIAS {
  DOMINGO = 'DOMINGO',
  LUNES = 'LUNES',
  MARTES = 'MARTES',
  MIERCOLES = 'MIERCOLES',
  JUEVES = 'JUEVES',
  VIERNES = 'VIERNES',
  SABADO = 'SABADO',
}

@Injectable()
export class DiaInit implements OnModuleInit {
  private readonly logger = new Logger('App-Init-DIAS_SEED');

  constructor(
    @InjectRepository(Dias) private readonly diaRepository: Repository<Dias>,
  ) {}

  async crear_todos_los_dias() {
    this.logger.debug('Creando todos los Dias');
    const dias_semanas = Object.values(VALID_DIAS).map((name) => ({
      name: name,
    }));
    for (const dia of dias_semanas) {
      const verificar = await this.diaRepository.findOneBy({
        name: dia.name,
      });
      if (!verificar) {
        const newPermiso = this.diaRepository.create({
          name: dia.name,
        });
        await this.diaRepository.save(newPermiso);
      }
    }
  }

  //Consultar si existte un admin
  async onModuleInit() {
    await this.crear_todos_los_dias();
  }
}
