import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { LotenetHaitiApiService } from './lotenet_haiti_api.service';
import { LotenetHaitiApi } from './entities/lotenet_haiti_api.entity';
import { CreateLotenetHaitiApiInput } from './dto/create-lotenet_haiti_api.input';
import { UpdateLotenetHaitiApiInput } from './dto/update-lotenet_haiti_api.input';
import { ResponsePropioGQl } from './../../common/response';
import { PaginationArgs } from './../..//common/dto/args';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Resolver(() => LotenetHaitiApi)
export class LotenetHaitiApiResolver {
  constructor(
    private readonly lotenetHaitiApiService: LotenetHaitiApiService,
  ) {}

  @Mutation(() => LotenetHaitiApi)
  async createLotenetHaitiApi(
    @Args('createLotenetHaitiApiInput')
    createLotenetHaitiApiInput: CreateLotenetHaitiApiInput,
  ): Promise<LotenetHaitiApi> {
    return this.lotenetHaitiApiService.create(createLotenetHaitiApiInput);
  }

  @Query(() => [LotenetHaitiApi], { name: 'allLotenetHaitiApi' })
  async findAll(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<LotenetHaitiApi[]> {
    return this.lotenetHaitiApiService.findAll(paginationArgs);
  }

  @Query(() => LotenetHaitiApi, { name: 'findLotenetHaitiApi' })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<LotenetHaitiApi> {
    return this.lotenetHaitiApiService.findOne(id);
  }

  @Mutation(() => LotenetHaitiApi)
  async updateLotenetHaitiApi(
    @Args('updateLotenetHaitiApiInput')
    updateLotenetHaitiApiInput: UpdateLotenetHaitiApiInput,
  ): Promise<LotenetHaitiApi> {
    return this.lotenetHaitiApiService.update(
      updateLotenetHaitiApiInput.id,
      updateLotenetHaitiApiInput,
    );
  }

  @Mutation(() => LotenetHaitiApi)
  async removeLotenetHaitiApi(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ResponsePropioGQl> {
    return this.lotenetHaitiApiService.remove(id);
  }
}
