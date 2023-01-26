import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

//Propio
import { ListsItemService } from './lists-item.service';
import { ListsItem } from './entities/lists-item.entity';
import { CreateListsItemInput } from './dto/create-lists-item.input';
import { UpdateListsItemInput } from './dto/update-lists-item.input';

import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import { PaginationArgs } from 'src/common/dto/args';

@Resolver(() => ListsItem)
@UseGuards(JwtAuthGuard)
export class ListsItemResolver {
  constructor(private readonly listsItemService: ListsItemService) {}

  @Mutation(() => ListsItem)
  async createListsItem(
    @Args('createListsItemInput') createListsItemInput: CreateListsItemInput,
    //TODO pueden pedir el usuario para validarlos
  ): Promise<ListsItem> {
    return this.listsItemService.create(createListsItemInput);
  }

  // @Query(() => [ListsItem], { name: 'listsItem' })
  // async findAll(@Args() PaginationArgs) {
  //   return this.listsItemService.findAll();
  // }
  //
  @Query(() => ListsItem, { name: 'findListsItem' })
  async findOne(
    @Args('id', { type: () => String }, ParseUUIDPipe) id: string,
  ): Promise<ListsItem> {
    return this.listsItemService.findOne(id);
  }

  @Mutation(() => ListsItem)
  updateListsItem(
    @Args('updateListsItemInput') updateListsItemInput: UpdateListsItemInput,
  ): Promise<ListsItem> {
    return this.listsItemService.update(
      updateListsItemInput.id,
      updateListsItemInput,
    );
  }
  //
  //@Mutation(() => ListsItem)
  //removeListsItem(@Args('id', { type: () => Int }) id: number) {
  //  return this.listsItemService.remove(id);
  //}
}
