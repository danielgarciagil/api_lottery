import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

//PROPIO
import { SorteoDiasService } from './sorteo_dias.service';
import { SorteoDias } from './entities/sorteo_dia.entity';
import { CreateSorteoDiaInput } from './dto/create-sorteo_dia.input';
import { UpdateSorteoDiaInput } from './dto/update-sorteo_dia.input';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { CurrentUser } from './../../auth/decorators/current-user.decorator';
import { VALID_PERMISO_ACCION } from './../../config/valid-roles';
import { User } from '../users/entities/user.entity';
import { ResponsePropioGQl } from './../../common/response';
import { PaginationArgs } from './../../common/dto/args';

@UseGuards(JwtAuthGuard)
@Resolver(() => SorteoDias)
export class SorteoDiasResolver {
  constructor(private readonly sorteoDiasService: SorteoDiasService) {}

  @Mutation(() => SorteoDias, {
    name: 'createSorteoDia',
    description: 'Para crear los dias que tendra un sorteo con su hora',
  })
  createSorteoDia(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_DIAS_CREATE]) user: User,
    @Args('createSorteoDiaInput') createSorteoDiaInput: CreateSorteoDiaInput,
  ): Promise<SorteoDias> {
    return this.sorteoDiasService.create(createSorteoDiaInput);
  }

  @Query(() => [SorteoDias], {
    name: 'allSorteoDias',
    description: 'Ver todos los dias y la hora de los sorteos', //todo
  })
  findAll(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_DIAS_VIEW]) user: User,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<SorteoDias[]> {
    return this.sorteoDiasService.findAll(paginationArgs);
  }

  @Query(() => SorteoDias, {
    name: 'findSorteoDia',
    description: 'Para ver en un dia especificio los sorteo que hay',
  })
  findOne(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_DIAS_VIEW]) user: User,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<SorteoDias> {
    return this.sorteoDiasService.findOne(id);
  }

  @Mutation(() => SorteoDias, {
    name: 'updateSorteoDia',
    description: 'Para actualizar un Sorteo Dia',
  })
  updateSorteoDia(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_DIAS_UPDATE]) user: User,
    @Args('updateSorteoDiaInput') updateSorteoDiaInput: UpdateSorteoDiaInput,
  ): Promise<SorteoDias> {
    return this.sorteoDiasService.update(
      updateSorteoDiaInput.id,
      updateSorteoDiaInput,
    );
  }

  @Mutation(() => ResponsePropioGQl, {
    name: 'removeSorteoDia',
    description: 'Para eliminar un Sorteo Dia',
  })
  removeSorteoDia(
    @CurrentUser([VALID_PERMISO_ACCION.SORTEO_DIAS_DELETE]) user: User,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ResponsePropioGQl> {
    return this.sorteoDiasService.remove(id);
  }
}
