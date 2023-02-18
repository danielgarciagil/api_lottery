import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

//PROPIPO
import { LoteriaService } from './loteria.service';
import { Loteria } from './entities/loteria.entity';
import { CreateLoteriaInput } from './dto/create-loteria.input';
import { UpdateLoteriaInput } from './dto/update-loteria.input';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { CurrentUser } from './../../auth/decorators/current-user.decorator';
import { VALID_PERMISO_ACCION } from './../../config/valid-roles';
import { User } from '../users/entities/user.entity';
import { PaginationArgs } from './../../common/dto/args';
import { ResponsePropioGQl } from 'src/common/response';

@UseGuards(JwtAuthGuard)
@Resolver(() => Loteria)
export class LoteriaResolver {
  constructor(private readonly loteriaService: LoteriaService) {}

  @Mutation(() => Loteria, {
    name: 'createLoteria',
    description: 'Para crear una Loteria',
  })
  async createLoteria(
    @CurrentUser([VALID_PERMISO_ACCION.LOTERIA_CREATE]) user: User,
    @Args('createLoteriaInput') createLoteriaInput: CreateLoteriaInput,
  ): Promise<Loteria> {
    return this.loteriaService.create(createLoteriaInput);
  }

  @Query(() => [Loteria], {
    name: 'allLoteria',
    description: 'Para ver todas las loterias',
  })
  async findAll(
    @CurrentUser([VALID_PERMISO_ACCION.LOTERIA_VIEW]) user: User,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Loteria[]> {
    return this.loteriaService.findAll(paginationArgs);
  }

  @Query(() => Loteria, {
    name: 'findLoteria',
    description: 'Para buscar una loteria en especifico',
  })
  async findOne(
    @CurrentUser([VALID_PERMISO_ACCION.LOTERIA_VIEW]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Loteria> {
    return this.loteriaService.findOne(id);
  }

  @Mutation(() => Loteria, {
    name: 'updateLoteria',
    description: 'Para actualizar una loteria',
  })
  async updateLoteria(
    @CurrentUser([VALID_PERMISO_ACCION.LOTERIA_UPDATE]) user: User,
    @Args('updateLoteriaInput') updateLoteriaInput: UpdateLoteriaInput,
  ): Promise<Loteria> {
    return this.loteriaService.update(
      updateLoteriaInput.id,
      updateLoteriaInput,
    );
  }

  @Mutation(() => ResponsePropioGQl, {
    name: 'removeLoteria',
    description: 'Para eliminar una loteria',
  })
  async removeLoteria(
    @CurrentUser([VALID_PERMISO_ACCION.LOTERIA_DELETE]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropioGQl> {
    return this.loteriaService.remove(id);
  }
}
