import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

//PROPIO
import { SorteoService } from './sorteo.service';
import { Sorteo } from './entities/sorteo.entity';
import { CreateSorteoInput } from './dto/create-sorteo.input';
import { UpdateSorteoInput } from './dto/update-sorteo.input';
import { ResponsePropioGQl } from './../../common/response';
import { PaginationArgs } from './../../common/dto/args';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { CurrentUser } from './../../auth/decorators/current-user.decorator';
import { VALID_PERMISO_ACCION } from 'src/config/valid-roles';
import { User } from '../users/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => Sorteo)
export class SorteoResolver {
  constructor(private readonly sorteoService: SorteoService) {}

  @Mutation(() => Sorteo, {
    name: 'createSorteo',
    description: 'para crear un Sorteo',
  })
  async createSorteo(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_CREATE]) user: User,
    @Args('createSorteoInput') createSorteoInput: CreateSorteoInput,
  ): Promise<Sorteo> {
    return this.sorteoService.create(createSorteoInput);
  }

  @Query(() => [Sorteo], {
    name: 'allSorteo',
    description: 'Para ver todos los sorteos',
  })
  async findAll(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_VIEW]) user: User,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Sorteo[]> {
    return this.sorteoService.findAll(paginationArgs);
  }

  @Query(() => Sorteo, {
    name: 'findSorteo',
    description: 'Para bsucar un sorteo',
  })
  async findOne(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_VIEW]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Sorteo> {
    return this.sorteoService.findOne(id);
  }

  @Mutation(() => Sorteo, {
    name: 'updateSorteo',
    description: 'Para actualizar un SOrteo',
  })
  async updateSorteo(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_UPDATE]) user: User,
    @Args('updateSorteoInput') updateSorteoInput: UpdateSorteoInput,
  ): Promise<Sorteo> {
    return this.sorteoService.update(updateSorteoInput.id, updateSorteoInput);
  }

  @Mutation(() => ResponsePropioGQl, {
    name: 'removeSorteo',
    description: 'Remover un sorteo',
  })
  async removeSorteo(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_DELETE]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropioGQl> {
    return this.sorteoService.remove(id);
  }
}
