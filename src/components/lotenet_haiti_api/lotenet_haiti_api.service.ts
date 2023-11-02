import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateLotenetHaitiApiInput } from './dto/create-lotenet_haiti_api.input';
import { UpdateLotenetHaitiApiInput } from './dto/update-lotenet_haiti_api.input';
import { LotenetHaitiApi } from './entities/lotenet_haiti_api.entity';
import { PaginationArgs } from './../../common/dto/args';
import { MESSAGE } from './../../config/messages';
import { ResponsePropioGQl } from './../../common/response';
import { SorteoService } from '../sorteo/sorteo.service';

@Injectable()
export class LotenetHaitiApiService {
  constructor(
    @InjectRepository(LotenetHaitiApi)
    private readonly lotenetHaitiApiRepository: Repository<LotenetHaitiApi>,
    private readonly sorteoService: SorteoService,
  ) {}

  validar_name_api(name: string): string {
    if (!name.endsWith('_haiti_api'))
      throw new BadRequestException('El name no termina en _haiti_api');
    return name.toLowerCase();
  }

  async validar_id_sorteo(id: number) {
    await this.sorteoService.findOne(id);
  }

  async create(
    createLotenetHaitiApiInput: CreateLotenetHaitiApiInput,
  ): Promise<LotenetHaitiApi> {
    const { id_sorteo_pick3, id_sorteo_pick4, name } =
      createLotenetHaitiApiInput;
    //Valido que el nombre tiene que terminar en _api
    //Guardar el nombre en minuscula siempre
    const newName = this.validar_name_api(name);

    //Aqui valido que ambos sorteo existan por lo menos
    await this.validar_id_sorteo(id_sorteo_pick3);
    await this.validar_id_sorteo(id_sorteo_pick4);
    try {
      const newLotenetHaitiApi = this.lotenetHaitiApiRepository.create({
        name: newName,
        id_sorteo_pick3,
        id_sorteo_pick4,
      });

      await this.lotenetHaitiApiRepository.save(newLotenetHaitiApi);
      return await this.findOne(newLotenetHaitiApi.id);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<LotenetHaitiApi[]> {
    const { limit, offset } = paginationArgs;
    return await this.lotenetHaitiApiRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<LotenetHaitiApi> {
    const lotenet_api = await this.lotenetHaitiApiRepository.findOneBy({
      id,
    });
    if (!lotenet_api) {
      throw new NotFoundException(MESSAGE.COMUN_ESTE_ID_NO_EXISTE);
    }
    return lotenet_api;
  }

  async findOneByName(name: string): Promise<LotenetHaitiApi> {
    const apiHaiti = await this.lotenetHaitiApiRepository.findOneBy({
      name: name,
    });
    if (!apiHaiti) {
      throw new NotFoundException(MESSAGE.COMUN_ESTE_ID_NO_EXISTE);
    }
    return apiHaiti;
  }

  async update(
    id: number,
    updateLotenetApiInput: UpdateLotenetHaitiApiInput,
  ): Promise<LotenetHaitiApi> {
    throw new BadGatewayException(MESSAGE.FALTA_IMPLEMENTAR_ESTE_METODO);
  }

  async remove(id: number): Promise<ResponsePropioGQl> {
    throw new BadGatewayException(MESSAGE.FALTA_IMPLEMENTAR_ESTE_METODO);
  }
}
