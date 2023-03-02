import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//PROPIO
import { CreatePlataformaInput } from './dto/create-plataforma.input';
import { UpdatePlataformaInput } from './dto/update-plataforma.input';
import { Plataforma } from './entities/plataforma.entity';
import { PaginationArgs } from './../../common/dto/args';
import { MESSAGE } from './../../config/messages';
import { ResponsePropioGQl } from './../../common/response';

@Injectable()
export class PlataformaService {
  constructor(
    @InjectRepository(Plataforma)
    private readonly plataformaRepository: Repository<Plataforma>,
  ) {}

  async create(
    createPlataformaInput: CreatePlataformaInput,
  ): Promise<Plataforma> {
    try {
      const newPlataforma = this.plataformaRepository.create(
        createPlataformaInput,
      );
      return await this.plataformaRepository.save(newPlataforma);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<Plataforma[]> {
    const { limit, offset } = paginationArgs;
    return await this.plataformaRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<Plataforma> {
    const plataforma = await this.plataformaRepository.findOneBy({ id });
    if (!plataforma) {
      throw new NotFoundException(MESSAGE.COMUN_ESTE_ID_NO_EXISTE);
    }
    return plataforma;
  }

  async update(
    id: number,
    updatePlataformaInput: UpdatePlataformaInput,
  ): Promise<Plataforma> {
    const plataforma = await this.findOne(id);
    try {
      this.plataformaRepository.merge(plataforma, updatePlataformaInput);
      return await this.plataformaRepository.save(plataforma);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  async remove(id: number): Promise<ResponsePropioGQl> {
    const plataforma = await this.findOne(id);
    try {
      await this.plataformaRepository.remove(plataforma);
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
