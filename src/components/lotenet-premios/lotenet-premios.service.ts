import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//PROPIO
import { CreateLotenetPremioInput } from './dto/create-lotenet-premio.input';
import { UpdateLotenetPremioInput } from './dto/update-lotenet-premio.input';
import { LotenetPremio } from './entities/lotenet-premio.entity';
import { PaginationArgs } from './../../common/dto/args';
import { ResponsePropioGQl } from './../../common/response';
import { MESSAGE } from './../../config/messages';
import { IdDiaArgs } from 'src/common/dto/args/pagination.args';

@Injectable()
export class LotenetPremiosService {
  constructor(
    @InjectRepository(LotenetPremio)
    private readonly lotenetPremioRepository: Repository<LotenetPremio>,
  ) {}

  async create(
    createLotenetPremioInput: CreateLotenetPremioInput,
  ): Promise<LotenetPremio> {
    try {
      const { id_plataforma, id_sorteo, ...rest } = createLotenetPremioInput;

      const newLotenetPremio = this.lotenetPremioRepository.create({
        ...rest,
        plataforma: { id: id_plataforma },
        sorteo: { id: id_sorteo },
      });

      await this.lotenetPremioRepository.save(newLotenetPremio);
      return await this.findOne(newLotenetPremio.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  async findAll(
    paginationArgs: PaginationArgs,
    idDiaArgs: IdDiaArgs,
  ): Promise<LotenetPremio[]> {
    const { limit, offset } = paginationArgs;
    const { id_dia } = idDiaArgs;
    if (id_dia == 0) {
      return await this.lotenetPremioRepository.find({
        take: limit,
        skip: offset,
      });
    }
    //TODO Probar que solo devuelva lo del dia
    return await this.lotenetPremioRepository.find({
      where: {
        premio_dia: {
          dias: {
            id: id_dia,
          },
        },
      },
    });
  }

  async findAllByDays(idDay: number): Promise<LotenetPremio[]> {
    return await this.lotenetPremioRepository.find({
      where: {
        premio_dia: {
          dias: {
            id: idDay,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<LotenetPremio> {
    const lotenetPremio = await this.lotenetPremioRepository.findOneBy({ id });
    if (!lotenetPremio) {
      throw new NotFoundException(MESSAGE.COMUN_ESTE_ID_NO_EXISTE);
    }
    return lotenetPremio;
  }

  async findOneSinError(id: number): Promise<LotenetPremio> {
    const lotenetPremio = await this.lotenetPremioRepository.findOneBy({ id });
    return lotenetPremio;
  }

  //TODO no cambio los id de los padres
  async update(
    id: number,
    updateLotenetPremioInput: UpdateLotenetPremioInput,
  ): Promise<LotenetPremio> {
    const lotenetPremio = await this.findOne(id);
    try {
      this.lotenetPremioRepository.merge(
        lotenetPremio,
        updateLotenetPremioInput,
      );
      return await this.lotenetPremioRepository.save(lotenetPremio);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  async remove(id: number): Promise<ResponsePropioGQl> {
    const lotenetPremio = await this.findOne(id);
    try {
      await this.lotenetPremioRepository.remove(lotenetPremio);
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
