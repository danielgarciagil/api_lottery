import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards, ParseIntPipe } from '@nestjs/common';

//PROPIO
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { PaginationArgs } from './../../common/dto/args';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { CurrentUser } from './../../auth/decorators/current-user.decorator';
import { VALID_PERMISO_ACCION } from './../../config/valid-roles';
import { User } from '../users/entities/user.entity';

@UseGuards(JwtAuthGuard)
@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => Role, {
    name: 'createRol',
    description: 'Para crear un Rol',
  })
  async createRole(
    @CurrentUser([VALID_PERMISO_ACCION.ROLE_CREATE]) user: User,
    @Args('createRoleInput') createRoleInput: CreateRoleInput,
  ) {
    return this.roleService.create(createRoleInput);
  }

  @Query(() => [Role], { name: 'allRole', description: 'Ver todos los roles' })
  async findAll(
    @CurrentUser([VALID_PERMISO_ACCION.ROLE_VIEW]) user: User,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.roleService.findAll(paginationArgs);
  }

  @Query(() => Role, { name: 'findRole', description: 'Ver un rol especifico' })
  async findOne(
    @CurrentUser([VALID_PERMISO_ACCION.ROLE_VIEW]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ) {
    return this.roleService.findOne(id);
  }

  @Mutation(() => Role, {
    name: 'updateRole',
    description: 'Actualizar un Rol',
  })
  async updateRole(
    @CurrentUser([VALID_PERMISO_ACCION.ROLE_UPDATE]) user: User,
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput,
  ) {
    return this.roleService.update(updateRoleInput.id, updateRoleInput);
  }

  @Mutation(() => Role, { name: 'removeRole', description: 'Eliminar un Rol' })
  async removeRole(
    @CurrentUser([VALID_PERMISO_ACCION.ROLE_DELETE]) user: User,
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ) {
    return this.roleService.remove(id);
  }
}
