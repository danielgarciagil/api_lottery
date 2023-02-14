import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';

//PROPIO
import { SorteoService } from './sorteo.service';
import { Sorteo } from './entities/sorteo.entity';
import { CreateSorteoInput } from './dto/create-sorteo.input';
import { UpdateSorteoInput } from './dto/update-sorteo.input';
import { ResponsePropioGQl } from './../../common/response';
import { PaginationArgs } from './../../common/dto/args';

@Resolver(() => Sorteo)
export class SorteoResolver {
  constructor(private readonly sorteoService: SorteoService) {}

  @Mutation(() => Sorteo, {
    name: 'createSorteo',
    description: 'para crear un Sorteo',
  })
  async createSorteo(
    @Args('createSorteoInput') createSorteoInput: CreateSorteoInput,
  ): Promise<Sorteo> {
    return this.sorteoService.create(createSorteoInput);
  }

  @Query(() => [Sorteo], {
    name: 'allSorteo',
    description: 'Para ver todos los sorteos',
  })
  async findAll(paginationArgs: PaginationArgs): Promise<Sorteo[]> {
    return this.sorteoService.findAll(paginationArgs);
  }

  @Query(() => Sorteo, {
    name: 'findSorteo',
    description: 'Para bsucar un sorteo',
  })
  async findOne(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Sorteo> {
    return this.sorteoService.findOne(id);
  }

  @Mutation(() => Sorteo, {
    name: 'updateSorteo',
    description: 'Para actualizar un SOrteo',
  })
  async updateSorteo(
    @Args('updateSorteoInput') updateSorteoInput: UpdateSorteoInput,
  ): Promise<Sorteo> {
    return this.sorteoService.update(updateSorteoInput.id, updateSorteoInput);
  }

  @Mutation(() => ResponsePropioGQl, {
    name: 'removeSorteo',
    description: 'Remover un sorteo',
  })
  async removeSorteo(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropioGQl> {
    return this.sorteoService.remove(id);
  }
}
