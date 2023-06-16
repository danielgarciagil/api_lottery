import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//PROPIo
import { CreateSorteoInput } from './dto/create-sorteo.input';
import { UpdateSorteoInput } from './dto/update-sorteo.input';
import { Sorteo } from './entities/sorteo.entity';
import { ResponsePropioGQl } from './../../common/response';
import { PaginationArgs } from './../../common/dto/args';
import { MESSAGE } from './../../config/messages';
import { IdDiaArgs } from 'src/common/dto/args/pagination.args';

@Injectable()
export class SorteoService {
  constructor(
    @InjectRepository(Sorteo)
    private readonly sorteoRepository: Repository<Sorteo>,
  ) {}

  async create(createSorteoInput: CreateSorteoInput): Promise<Sorteo> {
    try {
      const { id_juego, id_loteria, ...rest } = createSorteoInput;

      const newSorteo = this.sorteoRepository.create({
        ...rest,
        juego: { id: id_juego },
        loteria: { id: id_loteria },
      });

      await this.sorteoRepository.save(newSorteo);
      return await this.findOne(newSorteo.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  async findAll(
    paginationArgs: PaginationArgs,
    idDiaArgs: IdDiaArgs,
  ): Promise<Sorteo[]> {
    const { limit, offset } = paginationArgs;
    const { id_dia } = idDiaArgs;
    if (id_dia == 0) {
      return await this.sorteoRepository.find({
        take: limit,
        skip: offset,
      });
    }

    return await this.sorteoRepository.find({
      where: {
        sorteo_dias: {
          dias: {
            id: id_dia,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<Sorteo> {
    const sorteo = await this.sorteoRepository.findOneBy({ id });
    if (!sorteo) {
      throw new NotFoundException(MESSAGE.COMUN_ESTE_ID_NO_EXISTE);
    }
    return sorteo;
  }

  //todo solo permito cambiar propeidades de sorteo sin modificar padres
  //todo saber como cmabiar los dias
  async update(
    id: number,
    updateSorteoInput: UpdateSorteoInput,
  ): Promise<Sorteo> {
    const sorteo = await this.findOne(id);
    try {
      this.sorteoRepository.merge(sorteo, updateSorteoInput);
      return await this.sorteoRepository.save(sorteo);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  async remove(id: number): Promise<ResponsePropioGQl> {
    const sorteo = await this.findOne(id);
    try {
      await this.sorteoRepository.remove(sorteo);
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
