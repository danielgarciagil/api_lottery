import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

//PROPIO
import { PlataformaService } from './plataforma.service';
import { Plataforma } from './entities/plataforma.entity';
import { CreatePlataformaInput } from './dto/create-plataforma.input';
import { UpdatePlataformaInput } from './dto/update-plataforma.input';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { CurrentUser } from './../../auth/decorators/current-user.decorator';
import { VALID_PERMISO_ACCION } from './../../config/valid-roles';
import { User } from '../users/entities/user.entity';
import { PaginationArgs } from './../../common/dto/args';
import { ResponsePropioGQl } from 'src/common/response';

@UseGuards(JwtAuthGuard)
@Resolver(() => Plataforma)
export class PlataformaResolver {
  constructor(private readonly plataformaService: PlataformaService) {}

  @Mutation(() => Plataforma, {
    name: 'createPlataforma',
    description: 'Para crear una nueva plataforma en el modelo de LOTENET',
  })
  async createPlataforma(
    @CurrentUser([VALID_PERMISO_ACCION.PLATAFORMA_CREATE]) user: User,
    @Args('createPlataformaInput') createPlataformaInput: CreatePlataformaInput,
  ): Promise<Plataforma> {
    return this.plataformaService.create(createPlataformaInput);
  }

  @Query(() => [Plataforma], {
    name: 'allPlataforma',
    description: 'Para ver todas las plataformas de LOTENET',
  })
  async findAll(
    @CurrentUser([VALID_PERMISO_ACCION.PLATAFORMA_VIEW]) user: User,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Plataforma[]> {
    return this.plataformaService.findAll(paginationArgs);
  }

  @Query(() => Plataforma, {
    name: 'findPlataforma',
    description: 'Buscar una plataforma espeficifica',
  })
  async findOne(
    @CurrentUser([VALID_PERMISO_ACCION.PLATAFORMA_VIEW]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Plataforma> {
    return this.plataformaService.findOne(id);
  }

  @Mutation(() => Plataforma, {
    name: 'updatePlataforma',
    description: 'Editar una plataforma de Lotenet',
  })
  async updatePlataforma(
    @CurrentUser([VALID_PERMISO_ACCION.PLATAFORMA_UPDATE]) user: User,
    @Args('updatePlataformaInput') updatePlataformaInput: UpdatePlataformaInput,
  ): Promise<Plataforma> {
    return this.plataformaService.update(
      updatePlataformaInput.id,
      updatePlataformaInput,
    );
  }

  @Mutation(() => ResponsePropioGQl, {
    name: 'removePlataforma',
    description: 'Eliminar una paltaforma de LOTENEt',
  })
  async removePlataforma(
    @CurrentUser([VALID_PERMISO_ACCION.PLATAFORMA_DELETE]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropioGQl> {
    return this.plataformaService.remove(id);
  }
}
