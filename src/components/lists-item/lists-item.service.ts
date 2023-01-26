import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

//Propio
import { CreateListsItemInput } from './dto/create-lists-item.input';
import { UpdateListsItemInput } from './dto/update-lists-item.input';
import { ListsItem } from './entities/lists-item.entity';
import { List } from '../lists/entities/list.entity';
import { PaginationArgs } from './../../common/dto/args';
import { MESSAGE } from './../../config/messages';

@Injectable()
export class ListsItemService {
  constructor(
    @InjectRepository(ListsItem)
    private readonly listItemRepo: Repository<ListsItem>,
  ) {}

  async create(createListsItemInput: CreateListsItemInput): Promise<ListsItem> {
    try {
      const { itemId, listId, ...rest } = createListsItemInput;

      const newListItem = this.listItemRepo.create({
        ...rest,
        item: { id: itemId },
        list: { id: listId },
      });
      await this.listItemRepo.save(newListItem);
      return await this.findOne(newListItem.id);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async findAll(
    list: List,
    paginationArgs: PaginationArgs,
  ): Promise<ListsItem[]> {
    const { limit, offset } = paginationArgs;
    const { id } = list;
    return await this.listItemRepo.find({
      take: limit,
      skip: offset,
      where: {
        list: {
          id: id,
        },
      },
    });
  }

  async findOne(id: string): Promise<ListsItem> {
    const listItem = await this.listItemRepo.findOneBy({ id });
    if (!listItem)
      throw new NotFoundException(MESSAGE.No_SE_ENCONTRO_ESTE_LIST_ITEM);
    return listItem;
  }

  async update(
    id: string,
    updateListsItemInput: UpdateListsItemInput,
  ): Promise<ListsItem> {
    const { listId, itemId, ...rest } = updateListsItemInput;

    const queryBuilder = this.listItemRepo
      .createQueryBuilder()
      .update()
      .set({ ...rest }) // Actualzia cada uno de estos elementos
      .where('id = :id', { id });

    if (listId) queryBuilder.set({ list: { id: listId } });

    if (itemId) queryBuilder.set({ item: { id: itemId } });

    await queryBuilder.execute(); // Aqui ejcuto la funcion
    return this.findOne(id);

    ////TODO revisar esta relacion
    //const listItem = await this.listItemRepo.preload({
    //  ...rest,
    //  list: { id: listId },
    //  item: { id: itemId },
    //});
    //if (!listItem) throw new NotFoundException();
    //return this.listItemRepo.save(listItem);
  }

  async remove(id: string) {
    return `This action removes a #${id} listsItem`;
  }

  async countListItemsByList(list: List): Promise<number> {
    return this.listItemRepo.count({
      where: { list: { id: list.id } },
    });
  }
}
