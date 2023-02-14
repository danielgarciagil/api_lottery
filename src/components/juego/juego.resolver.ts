import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

//PROPIO
import { JuegoService } from './juego.service';
import { Juego } from './entities/juego.entity';
import { CreateJuegoInput } from './dto/create-juego.input';
import { UpdateJuegoInput } from './dto/update-juego.input';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { CurrentUser } from './../../auth/decorators/current-user.decorator';
import { VALID_PERMISO_ACCION } from './../../config/valid-roles';
import { User } from '../users/entities/user.entity';
import { PaginationArgs } from './../../common/dto/args';
import { ResponsePropioGQl } from './../../common/response';

@UseGuards(JwtAuthGuard)
@Resolver(() => Juego)
export class JuegoResolver {
  constructor(private readonly juegoService: JuegoService) {}

  @Mutation(() => Juego, {
    name: 'createJuego',
    description: 'Para crear un Juego',
  })
  async createJuego(
    @CurrentUser([VALID_PERMISO_ACCION.JUEGO_CREATE]) user: User,
    @Args('createJuegoInput') createJuegoInput: CreateJuegoInput,
  ): Promise<Juego> {
    return this.juegoService.create(createJuegoInput);
  }

  @Query(() => [Juego], {
    name: 'allJuego',
    description: 'Para ver todos los Juegos',
  })
  async findAll(
    @CurrentUser([VALID_PERMISO_ACCION.JUEGO_VIEW]) user: User,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Juego[]> {
    return this.juegoService.findAll(paginationArgs);
  }

  @Query(() => Juego, {
    name: 'findJuego',
    description: 'Para ver un juego especifico',
  })
  async findOne(
    @CurrentUser([VALID_PERMISO_ACCION.JUEGO_VIEW]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Juego> {
    return this.juegoService.findOne(id);
  }

  @Mutation(() => Juego, {
    name: 'updateJuego',
    description: 'Para actualizar un Juego',
  })
  async updateJuego(
    @CurrentUser([VALID_PERMISO_ACCION.JUEGO_UPDATE]) user: User,
    @Args('updateJuegoInput') updateJuegoInput: UpdateJuegoInput,
  ): Promise<Juego> {
    return this.juegoService.update(updateJuegoInput.id, updateJuegoInput);
  }

  @Mutation(() => ResponsePropioGQl, {
    name: 'removeJuego',
    description: 'Para eliminar un Juego',
  })
  async removeJuego(
    @CurrentUser([VALID_PERMISO_ACCION.JUEGO_DELETE]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropioGQl> {
    return this.juegoService.remove(id);
  }
}
