import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

//PROPIO
import { ResultadosService } from './resultados.service';
import { Resultado } from './entities/resultado.entity';
import { CreateResultadoInput } from './dto/create-resultado.input';
import { UpdateResultadoInput } from './dto/update-resultado.input';
import { PaginationArgs } from './../../common/dto/args';
import { ResponsePropioGQl } from './../../common/response';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { CurrentUser } from './../../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { VALID_PERMISO_ACCION } from './../../config/valid-roles';
import { FilterResultado } from './dto/filter-resultado.input';

@Resolver(() => Resultado)
export class ResultadosResolver {
  constructor(private readonly resultadosService: ResultadosService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Resultado, {
    name: 'createResultados',
    description: 'Para crear un Resultado',
  })
  async createResultado(
    @CurrentUser([VALID_PERMISO_ACCION.RESULTADO_CREATE]) user: User,
    @Args('createResultadoInput') createResultadoInput: CreateResultadoInput,
  ): Promise<Resultado> {
    return this.resultadosService.create(createResultadoInput, user);
  }

  @Query(() => [Resultado], {
    name: 'allResultados',
    description: 'Ver todos los resultados',
  })
  async findAll(
    //@CurrentUser([]) user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() filterResultado: FilterResultado,
  ): Promise<Resultado[]> {
    return await this.resultadosService.findAll(
      paginationArgs,
      filterResultado,
    );
  }

  @Query(() => Resultado, {
    name: 'findResultados',
    description: 'Ver un resultado especifico',
  })
  async findOne(
    // @CurrentUser([VALID_PERMISO_ACCION.RESULTADO_VIEW]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Resultado> {
    return this.resultadosService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Resultado, {
    name: 'updateResultados',
    description: 'Actualizar un Resultado',
  })
  async updateResultado(
    @CurrentUser([VALID_PERMISO_ACCION.RESULTADO_UPDATE]) user: User,
    @Args('updateResultadoInput') updateResultadoInput: UpdateResultadoInput,
  ): Promise<Resultado> {
    return this.resultadosService.update(
      updateResultadoInput.id,
      updateResultadoInput,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ResponsePropioGQl, {
    name: 'removeResultados',
    description: 'Remover un resultados',
  })
  async removeResultado(
    @CurrentUser([VALID_PERMISO_ACCION.RESULTADO_DELETE]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropioGQl> {
    return this.resultadosService.remove(id);
  }
}
