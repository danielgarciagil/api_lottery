import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

//PROPIo
import { CreateSorteoInput } from './dto/create-sorteo.input';
import { UpdateSorteoInput } from './dto/update-sorteo.input';
import { Sorteo } from './entities/sorteo.entity';
import { ResponsePropioGQl } from './../../common/response';
import { PaginationArgs } from './../../common/dto/args';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MESSAGE } from 'src/config/messages';

@Injectable()
export class SorteoService {
  constructor(
    @InjectRepository(Sorteo)
    private readonly sorteoRepository: Repository<Sorteo>,
  ) {}

  async create(createSorteoInput: CreateSorteoInput): Promise<Sorteo> {
    try {
      const { id_dia_semana, id_juego, ...rest } = createSorteoInput;
      const newSorteo = this.sorteoRepository.create({
        ...rest,
        juego: { id: id_juego },
        dia_semana: { id: id_dia_semana },
      });
      await this.sorteoRepository.save(newSorteo);
      return await this.findOne(newSorteo.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<Sorteo[]> {
    const { limit, offset } = paginationArgs;
    return await this.sorteoRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<Sorteo> {
    const sorteo = await this.sorteoRepository.findOneBy({ id });
    if (!sorteo) {
      throw new NotFoundException(MESSAGE.COMUN_ESTE_ID_NO_EXISTE);
    }
    return sorteo;
  }

  async update(
    id: number,
    updateSorteoInput: UpdateSorteoInput,
  ): Promise<Sorteo> {
    const sorteo = await this.findOne(id);
    this.sorteoRepository.merge(sorteo, updateSorteoInput);
    return await this.sorteoRepository.save(sorteo);
  }

  async remove(id: number): Promise<ResponsePropioGQl> {
    const sorteo = await this.findOne(id);
    try {
      await this.sorteoRepository.remove(sorteo);
      return {
        message: MESSAGE.COMUN_SE_ELIMINO_CORRECTAMENTE,
        status: 200,
      };
    } catch (error) {
      return {
        message: MESSAGE.COMUN_NO_SE_PUDO_ELIMINAR,
        status: 401,
      };
    }
  }
}
