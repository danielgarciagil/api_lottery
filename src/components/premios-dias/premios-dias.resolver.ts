import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

//PROPIO
import { PremiosDiasService } from './premios-dias.service';
import { PremiosDia } from './entities/premios-dia.entity';
import { CreatePremiosDiaInput } from './dto/create-premios-dia.input';
import { UpdatePremiosDiaInput } from './dto/update-premios-dia.input';
import { ResponsePropioGQl } from './../../common/response';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { VALID_PERMISO_ACCION } from './../../config/valid-roles';
import { PaginationArgs } from './../../common/dto/args';
import { CurrentUser } from './../../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => PremiosDia)
export class PremiosDiasResolver {
  constructor(private readonly premiosDiasService: PremiosDiasService) {}

  @Mutation(() => PremiosDia, {
    name: 'createPremisoDias',
    description: 'Para crear el dia de un Premio Automatico de Lotenet',
  })
  async createPremiosDia(
    @CurrentUser([VALID_PERMISO_ACCION.LOTENET_PREMIO_CREATE]) user: User,
    @Args('createPremiosDiaInput') createPremiosDiaInput: CreatePremiosDiaInput,
  ): Promise<PremiosDia> {
    return this.premiosDiasService.create(createPremiosDiaInput);
  }

  @Query(() => [PremiosDia], {
    name: 'allPremiosDias',
    description: 'Ver todos los dias de los premios',
  })
  async findAll(
    @CurrentUser([VALID_PERMISO_ACCION.LOTENET_PREMIO_VIEW]) user: User,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<PremiosDia[]> {
    return this.premiosDiasService.findAll(paginationArgs);
  }

  @Query(() => PremiosDia, {
    name: 'findPremiosDia',
    description: 'Ver un dia especifico de premio',
  })
  async findOne(
    @CurrentUser([VALID_PERMISO_ACCION.LOTENET_PREMIO_VIEW]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<PremiosDia> {
    return this.premiosDiasService.findOne(id);
  }

  @Mutation(() => PremiosDia, {
    name: 'updatePremiosDias',
    description: 'Actualizar el dia de un premio',
  })
  async updatePremiosDia(
    @CurrentUser([VALID_PERMISO_ACCION.LOTENET_PREMIO_UPDATE]) user: User,
    @Args('updatePremiosDiaInput') updatePremiosDiaInput: UpdatePremiosDiaInput,
  ): Promise<PremiosDia> {
    return this.premiosDiasService.update(
      updatePremiosDiaInput.id,
      updatePremiosDiaInput,
    );
  }

  @Mutation(() => ResponsePropioGQl, {
    name: 'removePremioDias',
    description: 'Eliminar el dia de un Premio',
  })
  async removePremiosDia(
    @CurrentUser([VALID_PERMISO_ACCION.LOTENET_PREMIO_DELETE]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropioGQl> {
    return this.premiosDiasService.remove(id);
  }
}
