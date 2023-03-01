import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//PROPIO
import { CreateLoteriaInput } from './dto/create-loteria.input';
import { UpdateLoteriaInput } from './dto/update-loteria.input';
import { Loteria } from './entities/loteria.entity';
import { PaginationArgs } from './../../common/dto/args';
import { MESSAGE } from './../../config/messages';
import { ResponsePropioGQl } from './../../common/response';

@Injectable()
export class LoteriaService {
  constructor(
    @InjectRepository(Loteria)
    private readonly loteriaRepository: Repository<Loteria>,
  ) {}

  async create(createLoteriaInput: CreateLoteriaInput): Promise<Loteria> {
    try {
      const newLoteria = this.loteriaRepository.create(createLoteriaInput);
      return await this.loteriaRepository.save(newLoteria);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<Loteria[]> {
    const { limit, offset } = paginationArgs;
    return await this.loteriaRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<Loteria> {
    const loteria = await this.loteriaRepository.findOneBy({ id });
    if (!loteria) {
      throw new NotFoundException(MESSAGE.COMUN_ESTE_ID_NO_EXISTE);
    }
    return loteria;
  }

  async update(
    id: number,
    updateLoteriaInput: UpdateLoteriaInput,
  ): Promise<Loteria> {
    const loteria = await this.findOne(id);
    try {
      this.loteriaRepository.merge(loteria, updateLoteriaInput);
      return await this.loteriaRepository.save(loteria);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  async remove(id: number): Promise<ResponsePropioGQl> {
    const loteria = await this.findOne(id);
    try {
      await this.loteriaRepository.remove(loteria);
      return {
        message: MESSAGE.COMUN_SE_ELIMINO_CORRECTAMENTE,
        status: 200,
        error: false,
      };
    } catch (error) {
      return {
        message: MESSAGE.COMUN_NO_SE_PUDO_ELIMINAR,
        status: 401,
        error: true,
      };
    }
  }
}
