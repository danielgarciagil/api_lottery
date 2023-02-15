import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

//PROPIO
import { XpathService } from './xpath.service';
import { Xpath } from './entities/xpath.entity';
import { CreateXpathInput } from './dto/create-xpath.input';
import { UpdateXpathInput } from './dto/update-xpath.input';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { CurrentUser } from './../../auth/decorators/current-user.decorator';
import { VALID_PERMISO_ACCION } from './../../config/valid-roles';
import { User } from '../users/entities/user.entity';
import { PaginationArgs } from './../../common/dto/args';
import { ResponsePropioGQl } from './../../common/response';

@UseGuards(JwtAuthGuard)
@Resolver(() => Xpath)
export class XpathResolver {
  constructor(private readonly xpathService: XpathService) {}

  @Mutation(() => Xpath, {
    name: 'createXpath',
    description: 'Para crear el Xpath',
  })
  async createXpath(
    @CurrentUser([VALID_PERMISO_ACCION.XPATH_CREATE]) user: User,
    @Args('createXpathInput')
    createXpathInput: CreateXpathInput,
  ): Promise<Xpath> {
    return this.xpathService.create(createXpathInput);
  }

  @Query(() => [Xpath], {
    name: 'allXpath',
    description: 'Para ver todos los xpath',
  })
  async findAll(
    @CurrentUser([VALID_PERMISO_ACCION.XPATH_VIEW]) user: User,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Xpath[]> {
    return this.xpathService.findAll(paginationArgs);
  }

  @Query(() => Xpath, {
    name: 'findXpath',
    description: 'Para ver un Xpath especifico',
  })
  async findOne(
    @CurrentUser([VALID_PERMISO_ACCION.XPATH_VIEW]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Xpath> {
    return this.xpathService.findOne(id);
  }

  @Mutation(() => Xpath, {
    name: 'updateXpath',
    description: 'Para actualizar un Xpath',
  })
  async updateXpath(
    @CurrentUser([VALID_PERMISO_ACCION.XPATH_UPDATE]) user: User,
    @Args('updateXpathInput') updateXpathInput: UpdateXpathInput,
  ): Promise<Xpath> {
    return this.xpathService.update(updateXpathInput.id, updateXpathInput);
  }

  @Mutation(() => ResponsePropioGQl, {
    name: 'removeXpath',
    description: 'Para eliminar un Xpath',
  })
  async removeXpath(
    @CurrentUser([VALID_PERMISO_ACCION.XPATH_DELETE]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropioGQl> {
    return this.xpathService.remove(id);
  }
}
