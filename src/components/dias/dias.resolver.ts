import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

//PROPIPO
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { CurrentUser } from './../../auth/decorators/current-user.decorator';
import { VALID_PERMISO_ACCION } from './../../config/valid-roles';
import { User } from '../users/entities/user.entity';
import { PaginationArgs } from './../../common/dto/args';
import { Dias } from './entity/dias.entity';
import { DiasService } from './dia.service';

@UseGuards(JwtAuthGuard)
@Resolver(() => Dias)
export class DiasResolver {
  constructor(private readonly diasService: DiasService) {}

  @Query(() => [Dias], {
    name: 'allDias',
    description: 'Para ver todos los Dias',
  })
  async findAll(
    @CurrentUser([VALID_PERMISO_ACCION.DIA_VIEW]) user: User,
    @Args()
    paginationArgs: PaginationArgs,
  ): Promise<Dias[]> {
    return this.diasService.findAll(paginationArgs);
  }

  @Query(() => Dias, {
    name: 'findDias',
    description: 'Para buscar un Dia en especifico',
  })
  async findOne(
    @CurrentUser([VALID_PERMISO_ACCION.DIA_VIEW]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe)
    id: number,
  ): Promise<Dias> {
    return this.diasService.findOne(id);
  }
}
