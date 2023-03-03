import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ResponseSorteoABuscarService } from './response_sorteo_a_buscar.service';
import { ResponseSorteoABuscar } from './entities/response_sorteo_a_buscar.entity';

import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { PaginationArgs } from './../../common/dto/args';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { VALID_PERMISO_ACCION } from 'src/config/valid-roles';
import { User } from '../users/entities/user.entity';

//TODO este Resolver a Futuro agregar roels y todos
@UseGuards(JwtAuthGuard)
@Resolver(() => ResponseSorteoABuscar)
export class ResponseSorteoABuscarResolver {
  constructor(
    private readonly responseSorteoABuscarService: ResponseSorteoABuscarService,
  ) {}

  //TODO agregar a futuro si se manda buscar un sorteo individual
  //@Mutation(() => ResponseSorteoABuscar)
  //createResponseSorteoABuscar(
  //  @Args('createResponseSorteoABuscarInput')
  //  createResponseSorteoABuscarInput: CreateResponseSorteoABuscarInput,
  //) {
  //  return this.responseSorteoABuscarService.create(
  //    createResponseSorteoABuscarInput,
  //  );
  //}

  @Query(() => [ResponseSorteoABuscar], {
    name: 'allResponseSorteoABuscar',
    description: 'Obtener todos los Response de SOrteo a Buscar',
  })
  findAll(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_A_BUSCAR_VIEW]) user: User,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<ResponseSorteoABuscar[]> {
    return this.responseSorteoABuscarService.findAll(paginationArgs);
  }

  @Query(() => ResponseSorteoABuscar, {
    name: 'findResponseSorteoABuscar',
    description: 'Obtener un Response especifico',
  })
  findOne(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_A_BUSCAR_VIEW]) user: User,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ResponseSorteoABuscar> {
    return this.responseSorteoABuscarService.findOne(id);
  }

  //@Mutation(() => ResponseSorteoABuscar)
  //updateResponseSorteoABuscar(
  //  @Args('updateResponseSorteoABuscarInput')
  //  updateResponseSorteoABuscarInput: UpdateResponseSorteoABuscarInput,
  //) {
  //  return this.responseSorteoABuscarService.update(
  //    updateResponseSorteoABuscarInput.id,
  //    updateResponseSorteoABuscarInput,
  //  );
  //}

  //@Mutation(() => ResponseSorteoABuscar)
  //removeResponseSorteoABuscar(@Args('id', { type: () => Int }) id: number) {
  //  return this.responseSorteoABuscarService.remove(id);
  //}
}
