import { Injectable } from '@nestjs/common';
import { CreateListsItemInput } from './dto/create-lists-item.input';
import { UpdateListsItemInput } from './dto/update-lists-item.input';

@Injectable()
export class ListsItemService {
  create(createListsItemInput: CreateListsItemInput) {
    return 'This action adds a new listsItem';
  }

  findAll() {
    return `This action returns all listsItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listsItem`;
  }

  update(id: number, updateListsItemInput: UpdateListsItemInput) {
    return `This action updates a #${id} listsItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} listsItem`;
  }
}
