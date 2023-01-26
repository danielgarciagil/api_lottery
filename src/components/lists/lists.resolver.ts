import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Field,
  Int,
} from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

//Propios
import { ListsService } from './lists.service';
import { List } from './entities/list.entity';
import { CreateListInput } from './dto/create-list.input';
import { UpdateListInput } from './dto/update-list.input';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { CurrentUser } from './../../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { PaginationArgs } from './../../common/dto/args';
import { ListsItem } from '../lists-item/entities/lists-item.entity';
import { ListsItemService } from '../lists-item/lists-item.service';

@Resolver(() => List)
@UseGuards(JwtAuthGuard)
export class ListsResolver {
  constructor(
    private readonly listsService: ListsService,
    private readonly listsItemsService: ListsItemService,
  ) {}

  @Mutation(() => List, { name: 'createLists' })
  async createList(
    @Args('createListInput') createListInput: CreateListInput,
    @CurrentUser() user: User,
  ): Promise<List> {
    return this.listsService.create(createListInput, user);
  }

  @Query(() => [List], { name: 'allLists' })
  async findAll(
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser() user: User,
  ): Promise<List[]> {
    return this.listsService.findAll(user, paginationArgs);
  }

  @Query(() => List, { name: 'findList' })
  async findOne(
    @Args('id', { type: () => String }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ): Promise<List> {
    return this.listsService.findOne(id, user);
  }

  @Mutation(() => List)
  async updateList(
    @Args('updateListInput') updateListInput: UpdateListInput,
    @CurrentUser() user: User,
  ): Promise<List> {
    return this.listsService.update(updateListInput.id, updateListInput, user);
  }

  @Mutation(() => List)
  async removeList(
    @Args('id', { type: () => String }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ): Promise<List> {
    return this.listsService.remove(id, user);
  }

  @ResolveField(() => [ListsItem], { name: 'allItemsItems' })
  async getListItems(
    @Parent() list: List,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<ListsItem[]> {
    return await this.listsItemsService.findAll(list, paginationArgs);
  }

  @ResolveField(() => Number, { name: 'totalItems' })
  async countListItemsByList(@Parent() list: List): Promise<number> {
    return this.listsItemsService.countListItemsByList(list);
  }
}
