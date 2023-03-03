import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSorteoABuscarInput } from './dto/create-sorteo_a_buscar.input';
import { UpdateSorteoABuscarInput } from './dto/update-sorteo_a_buscar.input';
import { SorteoABuscar } from './entities/sorteo_a_buscar.entity';
import { ResponsePropioGQl } from './../../common/response';
import { PaginationArgs } from './../../common/dto/args';
import { MESSAGE } from './../../config/messages';

@Injectable()
export class SorteoABuscarService {
  constructor(
    @InjectRepository(SorteoABuscar)
    private readonly sorteoABuscarRepository: Repository<SorteoABuscar>,
  ) {}

  async create(
    createSorteoABuscarInput: CreateSorteoABuscarInput,
  ): Promise<SorteoABuscar> {
    try {
      const { id_sorteo, ...rest } = createSorteoABuscarInput;

      const newSorteoABuscar = this.sorteoABuscarRepository.create({
        ...rest,
        sorteo: { id: id_sorteo },
      });

      await this.sorteoABuscarRepository.save(newSorteoABuscar);
      return await this.findOne(newSorteoABuscar.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<SorteoABuscar[]> {
    const { limit, offset } = paginationArgs;
    return await this.sorteoABuscarRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findAllByDays(idDay: number): Promise<SorteoABuscar[]> {
    return await this.sorteoABuscarRepository.find({
      where: {
        sorteo: {
          sorteo_dias: {
            dias: {
              id: idDay,
            },
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<SorteoABuscar> {
    const sorteo_a_buscar = await this.sorteoABuscarRepository.findOneBy({
      id,
    });
    if (!sorteo_a_buscar) {
      throw new NotFoundException(MESSAGE.COMUN_ESTE_ID_NO_EXISTE);
    }
    return sorteo_a_buscar;
  }

  async devolverSiestaActivo(id: number): Promise<SorteoABuscar> {
    const sorteoABuscar = await this.findOne(id);
    if (!sorteoABuscar.activo) {
      throw new UnprocessableEntityException(
        MESSAGE.COMUN_ESTE_ELEMENTO_ESTA_INACTIVO,
      );
    }
    return sorteoABuscar;
  }

  async findOneSinError(id: number): Promise<SorteoABuscar> {
    const sorteo_a_buscar = await this.sorteoABuscarRepository.findOneBy({
      id,
    });
    return sorteo_a_buscar;
  }

  async update(
    id: number,
    updateSorteoABuscarInput: UpdateSorteoABuscarInput,
  ): Promise<SorteoABuscar> {
    throw new BadGatewayException(MESSAGE.FALTA_IMPLEMENTAR_ESTE_METODO); // todo
  }

  async remove(id: number): Promise<ResponsePropioGQl> {
    const sorteo_a_buscar = await this.findOne(id);
    try {
      await this.sorteoABuscarRepository.remove(sorteo_a_buscar);
      return {
        message: MESSAGE.COMUN_SE_ELIMINO_CORRECTAMENTE,
        error: false,
      };
    } catch (error) {
      return {
        message: MESSAGE.COMUN_NO_SE_PUDO_ELIMINAR,
        error: true,
      };
    }
  }
}
