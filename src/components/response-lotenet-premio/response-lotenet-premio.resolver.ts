import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Int } from '@nestjs/graphql';

//PROPIO
import { ResponseLotenetPremioService } from './response-lotenet-premio.service';
import { ResponseLotenetPremio } from './entities/response-lotenet-premio.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationArgs } from 'src/common/dto/args';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { VALID_PERMISO_ACCION } from 'src/config/valid-roles';
import { User } from '../users/entities/user.entity';
//import { CreateResponseLotenetPremioInput } from './dto/create-response-lotenet-premio.input';
//import { UpdateResponseLotenetPremioInput } from './dto/update-response-lotenet-premio.input';
@UseGuards(JwtAuthGuard)
@Resolver(() => ResponseLotenetPremio)
export class ResponseLotenetPremioResolver {
  constructor(
    private readonly responseLotenetPremioService: ResponseLotenetPremioService,
  ) {}

  //@Mutation(() => ResponseLotenetPremio)
  //createResponseLotenetPremio(
  //  @Args('createResponseLotenetPremioInput')
  //  createResponseLotenetPremioInput: CreateResponseLotenetPremioInput,
  //) {
  //  return this.responseLotenetPremioService.create(
  //    createResponseLotenetPremioInput,
  //  );
  //}

  @Query(() => [ResponseLotenetPremio], {
    name: 'AllResponseLotenetPremio',
    description: 'Para ver todos los Response de Lotenet Premio',
  })
  async findAll(
    @CurrentUser([VALID_PERMISO_ACCION.LOTENET_PREMIO_VIEW]) user: User,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<ResponseLotenetPremio[]> {
    return this.responseLotenetPremioService.findAll(paginationArgs);
  }

  @Query(() => ResponseLotenetPremio, {
    name: 'findResponseLotenetPremio',
    description: 'Para ver un Reponse Especifico con detalle',
  })
  async findOne(
    @CurrentUser([VALID_PERMISO_ACCION.LOTENET_PREMIO_VIEW]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponseLotenetPremio> {
    return this.responseLotenetPremioService.findOne(id);
  }

  //@Mutation(() => ResponseLotenetPremio)
  //updateResponseLotenetPremio(
  //  @Args('updateResponseLotenetPremioInput')
  //  updateResponseLotenetPremioInput: UpdateResponseLotenetPremioInput,
  //) {
  //  return this.responseLotenetPremioService.update(
  //    updateResponseLotenetPremioInput.id,
  //    updateResponseLotenetPremioInput,
  //  );
  //}
  //
  //@Mutation(() => ResponseLotenetPremio)
  //removeResponseLotenetPremio(@Args('id', { type: () => Int }) id: number) {
  //  return this.responseLotenetPremioService.remove(id);
  //}
}
