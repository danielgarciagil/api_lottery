import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  //TODO example, borrar esto
  @Query(() => [User], {
    name: 'findAllUsers',
    description: 'Devolver todos los usuarios,EXAMPLE borrar este Query',
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  //TODO example, borrar esto
  @Query(() => User, {
    name: 'findUser',
    description: 'Devolver todos los usuarios,EXAMPLE borrar este Query',
  })
  findOne(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.usersService.findOneById(id);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  @Mutation(() => User)
  blockUser(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.usersService.block(id);
  }
}
