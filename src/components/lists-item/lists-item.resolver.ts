import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ListsItemService } from './lists-item.service';
import { ListsItem } from './entities/lists-item.entity';
import { CreateListsItemInput } from './dto/create-lists-item.input';
import { UpdateListsItemInput } from './dto/update-lists-item.input';

@Resolver(() => ListsItem)
export class ListsItemResolver {
  constructor(private readonly listsItemService: ListsItemService) {}

  @Mutation(() => ListsItem)
  createListsItem(
    @Args('createListsItemInput') createListsItemInput: CreateListsItemInput,
  ) {
    return this.listsItemService.create(createListsItemInput);
  }

  @Query(() => [ListsItem], { name: 'listsItem' })
  findAll() {
    return this.listsItemService.findAll();
  }

  @Query(() => ListsItem, { name: 'listsItem' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.listsItemService.findOne(id);
  }

  @Mutation(() => ListsItem)
  updateListsItem(
    @Args('updateListsItemInput') updateListsItemInput: UpdateListsItemInput,
  ) {
    return this.listsItemService.update(
      updateListsItemInput.id,
      updateListsItemInput,
    );
  }

  @Mutation(() => ListsItem)
  removeListsItem(@Args('id', { type: () => Int }) id: number) {
    return this.listsItemService.remove(id);
  }
}
