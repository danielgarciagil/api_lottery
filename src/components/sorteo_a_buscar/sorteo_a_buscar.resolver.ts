import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

//PROPIO
import { SorteoABuscarService } from './sorteo_a_buscar.service';
import { SorteoABuscar } from './entities/sorteo_a_buscar.entity';
import { CreateSorteoABuscarInput } from './dto/create-sorteo_a_buscar.input';
import { UpdateSorteoABuscarInput } from './dto/update-sorteo_a_buscar.input';
import { ResponsePropioGQl } from './../../common/response';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { CurrentUser } from './../../auth/decorators/current-user.decorator';
import { VALID_PERMISO_ACCION } from './../../config/valid-roles';
import { User } from '../users/entities/user.entity';
import { PaginationArgs } from './../../common/dto/args';

@UseGuards(JwtAuthGuard)
@Resolver(() => SorteoABuscar)
export class SorteoABuscarResolver {
  constructor(private readonly sorteoABuscarService: SorteoABuscarService) {}

  @Mutation(() => SorteoABuscar, {
    name: 'createSorteoABuscar',
    description:
      'Para crear un Sctipt que busque solo el premio mediante webscraping',
  })
  async createSorteoABuscar(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_A_BUSCAR_CREATE]) user: User,
    @Args('createSorteoABuscarInput')
    createSorteoABuscarInput: CreateSorteoABuscarInput,
  ): Promise<SorteoABuscar> {
    return this.sorteoABuscarService.create(createSorteoABuscarInput);
  }

  @Query(() => [SorteoABuscar], {
    name: 'allSorteoABuscar',
    description:
      'Para ver la configuracion de todos los script automatico de buscar premios',
  })
  async findAll(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_A_BUSCAR_VIEW]) user: User,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<SorteoABuscar[]> {
    return this.sorteoABuscarService.findAll(paginationArgs);
  }

  @Query(() => SorteoABuscar, {
    name: 'findSorteoABuscar',
    description: 'Para buscar la configuracion de un sorteo especifico',
  })
  findOne(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_A_BUSCAR_VIEW]) user: User,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.sorteoABuscarService.findOne(id);
  }

  @Mutation(() => SorteoABuscar, {
    name: 'updateSorteoABuscar',
    description: 'Editar la configuracion del script de busqueda de un sorteo',
  })
  async updateSorteoABuscar(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_A_BUSCAR_VIEW]) user: User,
    @Args('updateSorteoABuscarInput')
    updateSorteoABuscarInput: UpdateSorteoABuscarInput,
  ): Promise<SorteoABuscar> {
    return this.sorteoABuscarService.update(
      updateSorteoABuscarInput.id,
      updateSorteoABuscarInput,
    );
  }

  @Mutation(() => ResponsePropioGQl, {
    name: 'removeSorteoABuscar',
    description: 'Eliminar el script de sorteo a buscar',
  })
  async removeSorteoABuscar(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_A_BUSCAR_DELETE]) user: User,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ResponsePropioGQl> {
    return this.sorteoABuscarService.remove(id);
  }
}
