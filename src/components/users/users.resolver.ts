import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

//Propios
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { CurrentUser } from './../../auth/decorators/current-user.decorator';

import { PaginationArgs } from './../../common/dto/args';
import { VALID_PERMISO_ACCION } from './../../config/valid-roles';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], {
    name: 'allUser',
    description: 'Devolver todos los usuarios',
  })
  async findAll(
    @CurrentUser([VALID_PERMISO_ACCION.USER_VIEW]) user: User,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<User[]> {
    return await this.usersService.findAll(paginationArgs);
  }

  @Query(() => User, {
    name: 'findUser',
    description: 'Devolver todos los usuarios',
  })
  async findOne(
    @CurrentUser([VALID_PERMISO_ACCION.USER_VIEW]) user: User,
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => User, {
    name: 'updateUser',
    description: 'Con este query actualiza el usuario',
  })
  async updateUser(
    @CurrentUser([VALID_PERMISO_ACCION.USER_UPDATE]) user: User,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User, {
    name: 'blockUser',
    description: ' Para bloquear el estado de un usuario',
  })
  async blockUser(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @CurrentUser([VALID_PERMISO_ACCION.USER_VIEW]) user: User,
  ): Promise<User> {
    return this.usersService.block(id);
  }
}
