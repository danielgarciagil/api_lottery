import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Int,
  Parent,
} from '@nestjs/graphql';

//Propios
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
//import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ValidRolesArgs } from './dto/args/roles.arg';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { CurrentUser } from './../../auth/decorators/current-user.decorator';
import { ValidRoles } from './../../auth/enums/valid-roles.enum';
import { ItemsService } from '../items/items.service';
import { Item } from '../items/entities/item.entity';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly itemsService: ItemsService,
  ) {}

  //TODO example, borrar esto
  @Query(() => [User], {
    name: 'findAllUsers',
    description: 'Devolver todos los usuarios,EXAMPLE borrar este Query',
  })
  async findAll(
    @Args() validRoles: ValidRolesArgs,
    @CurrentUser([ValidRoles.ADMIN]) user: User, //Solo los usuarios ADMIN pueden entrar a esta ruta
    @Args() paginationArgs: PaginationArgs,
  ): Promise<User[]> {
    return await this.usersService.findAll(validRoles.roles, paginationArgs);
  }

  //TODO example, borrar esto
  @Query(() => User, {
    name: 'findUser',
    description: 'Devolver todos los usuarios,EXAMPLE borrar este Query',
  })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([ValidRoles.ADMIN]) user: User,
  ): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => User, {
    name: 'updateUser',
    description: 'Con este query actualiza el usuario',
  })
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser([ValidRoles.ADMIN]) user: User,
  ): Promise<User> {
    return this.usersService.update(updateUserInput.id, updateUserInput, user);
  }

  @Mutation(() => User, {
    name: 'blockUser',
    description: ' Para bloquear el estado de un usuario',
  })
  async blockUser(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([ValidRoles.ADMIN]) user: User,
  ): Promise<User> {
    return this.usersService.block(id, user);
  }

  @ResolveField(() => Int, {
    name: 'itemCount',
    description: 'Cuantos items tiene este usuario',
  })
  async itemCount(
    @Parent() user: User,
    @CurrentUser([ValidRoles.ADMIN]) adminUser: User,
  ): Promise<number> {
    return await this.itemsService.itemCountByUser(user);
  }

  @ResolveField(() => [Item], {
    name: 'items',
    description: 'Nos mostraras los items del uusario',
  })
  async getItemsByUsers(
    @Parent() user: User,
    @CurrentUser([ValidRoles.ADMIN]) adminUser: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<Item[]> {
    return await this.itemsService.findAll(user, paginationArgs, searchArgs);
    //return 10;
  }
}
