import {
  BadGatewayException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatePremiosDiaInput } from './dto/create-premios-dia.input';
import { UpdatePremiosDiaInput } from './dto/update-premios-dia.input';
import { PremiosDia } from './entities/premios-dia.entity';
import { PaginationArgs } from 'src/common/dto/args';
import { ResponsePropioGQl } from 'src/common/response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MESSAGE } from 'src/config/messages';

@Injectable()
export class PremiosDiasService {
  constructor(
    @InjectRepository(PremiosDia)
    private readonly premiosDiasRepository: Repository<PremiosDia>,
  ) {}

  async create(
    createPremiosDiaInput: CreatePremiosDiaInput,
  ): Promise<PremiosDia> {
    try {
      const { id_dia, id_lotenet_premio, ...rest } = createPremiosDiaInput;

      const newSorteo = this.premiosDiasRepository.create({
        ...rest,
        dias: { id: id_dia },
        lotenet_premio: { id: id_lotenet_premio },
      });

      await this.premiosDiasRepository.save(newSorteo);
      return await this.findOne(newSorteo.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<PremiosDia[]> {
    const { limit, offset } = paginationArgs;
    return await this.premiosDiasRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<PremiosDia> {
    const premiosDias = await this.premiosDiasRepository.findOneBy({ id });
    if (!premiosDias) {
      throw new NotFoundException(MESSAGE.COMUN_ESTE_ID_NO_EXISTE);
    }
    return premiosDias;
  }

  async update(
    id: number,
    updatePremiosDiaInput: UpdatePremiosDiaInput,
  ): Promise<PremiosDia> {
    throw new BadGatewayException(MESSAGE.FALTA_IMPLEMENTAR_ESTE_METODO);
  }

  async remove(id: number): Promise<ResponsePropioGQl> {
    const premio_dia = await this.findOne(id);
    try {
      await this.premiosDiasRepository.remove(premio_dia);
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
