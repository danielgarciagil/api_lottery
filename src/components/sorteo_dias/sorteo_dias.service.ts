import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//PROPIO
import { CreateSorteoDiaInput } from './dto/create-sorteo_dia.input';
import { UpdateSorteoDiaInput } from './dto/update-sorteo_dia.input';
import { SorteoDias } from './entities/sorteo_dia.entity';
import { PaginationArgs } from './../../common/dto/args';
import { ResponsePropioGQl } from './../../common/response';
import { MESSAGE } from './../../config/messages';

@Injectable()
export class SorteoDiasService {
  constructor(
    @InjectRepository(SorteoDias)
    private readonly sorteoDiaRepository: Repository<SorteoDias>,
  ) {}

  //TODO me falta controla que un sorteo solo puede pertener a una hora al dia, no valias hora
  async create(
    createSorteoDiaInput: CreateSorteoDiaInput,
  ): Promise<SorteoDias> {
    try {
      const { id_dia, id_sorteo, ...rest } = createSorteoDiaInput;

      const newSorteo = this.sorteoDiaRepository.create({
        ...rest,
        dias: { id: id_dia },
        sorteo: { id: id_sorteo },
      });

      await this.sorteoDiaRepository.save(newSorteo);
      return await this.findOne(newSorteo.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<SorteoDias[]> {
    const { limit, offset } = paginationArgs;
    return await this.sorteoDiaRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<SorteoDias> {
    const sorteoDias = await this.sorteoDiaRepository.findOneBy({ id });
    if (!sorteoDias) {
      throw new NotFoundException(MESSAGE.COMUN_ESTE_ID_NO_EXISTE);
    }
    return sorteoDias;
  }

  async update(
    id: number,
    updateSorteoDiaInput: UpdateSorteoDiaInput,
  ): Promise<SorteoDias> {
    throw new BadGatewayException(MESSAGE.FALTA_IMPLEMENTAR_ESTE_METODO);
  }

  async remove(id: number): Promise<ResponsePropioGQl> {
    const sorteo_dia = await this.findOne(id);
    try {
      await this.sorteoDiaRepository.remove(sorteo_dia);
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
