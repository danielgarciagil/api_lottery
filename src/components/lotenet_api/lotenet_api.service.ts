import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

//Propio
import {
  CreateLotenetApiInput,
  FilterSorteo,
} from './dto/create-lotenet_api.input';
import { UpdateLotenetApiInput } from './dto/update-lotenet_api.input';
import { LotenetApi } from './entities/lotenet_api.entity';
import { MESSAGE } from './../../config/messages';
import { PaginationArgs } from './../../common/dto/args';
import { ResponsePropioGQl } from './../../common/response';

@Injectable()
export class LotenetApiService {
  constructor(
    @InjectRepository(LotenetApi)
    private readonly lotenetApiRepository: Repository<LotenetApi>,
  ) {}

  validar_name_api(name: string): string {
    if (!name.endsWith('_api'))
      throw new BadRequestException('El name no termina en _api');
    return name.toLowerCase();
  }

  async create(
    createLotenetApiInput: CreateLotenetApiInput,
  ): Promise<LotenetApi> {
    try {
      const { id_sorteo, longitud, name } = createLotenetApiInput;

      //Todo valido que el nombre tiene que terminar en _api
      //Todo guardar el nombre en minuscula siempre
      const newName = this.validar_name_api(name);

      const newLotenetApi = this.lotenetApiRepository.create({
        longitud,
        name: newName,
        sorteo: { id: id_sorteo },
      });

      await this.lotenetApiRepository.save(newLotenetApi);
      return await this.findOne(newLotenetApi.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<LotenetApi[]> {
    const { limit, offset } = paginationArgs;
    return await this.lotenetApiRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOneByName(filterSorteo: FilterSorteo): Promise<LotenetApi> {
    const lotenet_api = await this.lotenetApiRepository.findOne({
      where: {
        name: filterSorteo.name,
      },
    });
    if (!lotenet_api) {
      throw new NotFoundException(MESSAGE.COMUN_ESTE_ID_NO_EXISTE);
    }
    return lotenet_api;
  }

  async findOne(id: number): Promise<LotenetApi> {
    const lotenet_api = await this.lotenetApiRepository.findOneBy({
      id,
    });
    if (!lotenet_api) {
      throw new NotFoundException(MESSAGE.COMUN_ESTE_ID_NO_EXISTE);
    }
    return lotenet_api;
  }

  async update(
    id: number,
    updateLotenetApiInput: UpdateLotenetApiInput,
  ): Promise<LotenetApi> {
    throw new BadGatewayException(MESSAGE.FALTA_IMPLEMENTAR_ESTE_METODO);
  }

  async remove(id: number): Promise<ResponsePropioGQl> {
    throw new BadGatewayException(MESSAGE.FALTA_IMPLEMENTAR_ESTE_METODO);
  }
}
