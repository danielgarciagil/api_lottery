import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

//PROPIO
import { LotenetPremiosService } from './lotenet-premios.service';
import { LotenetPremio } from './entities/lotenet-premio.entity';
import { CreateLotenetPremioInput } from './dto/create-lotenet-premio.input';
import { UpdateLotenetPremioInput } from './dto/update-lotenet-premio.input';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { PaginationArgs } from './../../common/dto/args';
import { ResponsePropioGQl } from './../../common/response';
import { CurrentUser } from './../../auth/decorators/current-user.decorator';
import { VALID_PERMISO_ACCION } from './../../config/valid-roles';
import { User } from '../users/entities/user.entity';
import { IdDiaArgs } from 'src/common/dto/args/pagination.args';

//@UseGuards(JwtAuthGuard)
@Resolver(() => LotenetPremio)
export class LotenetPremiosResolver {
  constructor(private readonly lotenetPremiosService: LotenetPremiosService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => LotenetPremio, {
    name: 'createLotenetPremio',
    description: 'Para crear un Premio Automatico en Lotenet',
  })
  async createLotenetPremio(
    @CurrentUser([VALID_PERMISO_ACCION.LOTENET_PREMIO_CREATE]) user: User,
    @Args('createLotenetPremioInput')
    createLotenetPremioInput: CreateLotenetPremioInput,
  ): Promise<LotenetPremio> {
    return this.lotenetPremiosService.create(createLotenetPremioInput);
  }

  @Query(() => [LotenetPremio], {
    name: 'allLotenetPremios',
    description: 'Para ver todos los premios configurados',
  })
  async findAll(
    //@CurrentUser([VALID_PERMISO_ACCION.LOTENET_PREMIO_VIEW]) user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() idDiaArgs: IdDiaArgs,
  ): Promise<LotenetPremio[]> {
    return this.lotenetPremiosService.findAll(paginationArgs, idDiaArgs);
  }

  @Query(() => LotenetPremio, {
    name: 'findLotenetPremio',
    description: 'Ver un premio especifico de lotenet',
  })
  async findOne(
    @CurrentUser([VALID_PERMISO_ACCION.LOTENET_PREMIO_VIEW]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<LotenetPremio> {
    return this.lotenetPremiosService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => LotenetPremio, {
    name: 'updateLotenetPremio',
    description: 'Actualizar una configuracion de premio de Lotenet',
  })
  async updateLotenetPremio(
    @CurrentUser([VALID_PERMISO_ACCION.LOTENET_PREMIO_UPDATE]) user: User,
    @Args('updateLotenetPremioInput')
    updateLotenetPremioInput: UpdateLotenetPremioInput,
  ): Promise<LotenetPremio> {
    return this.lotenetPremiosService.update(
      updateLotenetPremioInput.id,
      updateLotenetPremioInput,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ResponsePropioGQl, {
    name: 'removeLotenetPremio',
    description: 'Eliminar un LotenetPremio',
  })
  async removeLotenetPremio(
    @CurrentUser([VALID_PERMISO_ACCION.LOTENET_PREMIO_DELETE]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropioGQl> {
    return this.lotenetPremiosService.remove(id);
  }
}
