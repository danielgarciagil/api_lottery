import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { LotenetApiService } from './lotenet_api.service';
import { LotenetApi } from './entities/lotenet_api.entity';
import { CreateLotenetApiInput } from './dto/create-lotenet_api.input';
import { UpdateLotenetApiInput } from './dto/update-lotenet_api.input';
import { PaginationArgs } from './../../common/dto/args';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { ResponsePropioGQl } from './../../common/response';

@UseGuards(JwtAuthGuard)
@Resolver(() => LotenetApi)
export class LotenetApiResolver {
  constructor(private readonly lotenetApiService: LotenetApiService) {}

  @Mutation(() => LotenetApi, {
    name: 'createLotenetApi',
    description: 'Para crear la conexcion con el api de Lotenet',
  })
  async createLotenetApi(
    @Args('createLotenetApiInput') createLotenetApiInput: CreateLotenetApiInput,
  ): Promise<LotenetApi> {
    return this.lotenetApiService.create(createLotenetApiInput);
  }

  @Query(() => [LotenetApi], {
    name: 'allLotenetApi',
    description: 'Para ver todos los LotenetApi',
  })
  async findAll(@Args() paginationArgs: PaginationArgs): Promise<LotenetApi[]> {
    return this.lotenetApiService.findAll(paginationArgs);
  }

  @Query(() => LotenetApi, {
    name: 'findLotenetApi',
    description: 'Para buscar un Lotenert Api especifico',
  })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<LotenetApi> {
    return this.lotenetApiService.findOne(id);
  }

  @Mutation(() => LotenetApi, {
    name: 'updateLotenetApi',
    description: 'Para actualizar un lotenetApi',
  })
  async updateLotenetApi(
    @Args('updateLotenetApiInput') updateLotenetApiInput: UpdateLotenetApiInput,
  ): Promise<LotenetApi> {
    return this.lotenetApiService.update(
      updateLotenetApiInput.id,
      updateLotenetApiInput,
    );
  }

  @Mutation(() => LotenetApi)
  async removeLotenetApi(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ResponsePropioGQl> {
    return this.lotenetApiService.remove(id);
  }
}
