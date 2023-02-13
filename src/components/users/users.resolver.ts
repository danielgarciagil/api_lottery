import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

//Propios
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { CurrentUser } from './../../auth/decorators/current-user.decorator';

import { PaginationArgs, SearchArgs } from './../../common/dto/args';

@Resolver(() => User)
//TODO @UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], {
    name: 'allUser',
    description: 'Devolver todos los usuarios',
  })
  async findAll(
    //TODO @CurrentUser([ValidRoles.ADMIN]) user: User, //Solo los usuarios ADMIN pueden entrar a esta ruta
    @Args() paginationArgs: PaginationArgs,
  ): Promise<User[]> {
    return await this.usersService.findAll(paginationArgs);
  }

  //TODO example, borrar esto
  @Query(() => User, {
    name: 'findUser',
    description: 'Devolver todos los usuarios',
  })
  async findOne(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    //TODO @CurrentUser([ValidRoles.ADMIN]) user: User,
  ): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => User, {
    name: 'updateUser',
    description: 'Con este query actualiza el usuario',
  })
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    //TODO @CurrentUser([ValidRoles.ADMIN]) user: User,
  ): Promise<User> {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User, {
    name: 'blockUser',
    description: ' Para bloquear el estado de un usuario',
  })
  async blockUser(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    //TODO @CurrentUser([ValidRoles.ADMIN]) user: User,
  ): Promise<User> {
    return this.usersService.block(id);
  }
}
