import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

//Libreria Propia
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { Item } from './entities/item.entity';
import { MESSAGE } from './../../config/messages';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemRepo: Repository<Item>,
  ) {}

  async create(createItemInput: CreateItemInput): Promise<Item> {
    try {
      const newItem = this.itemRepo.create(createItemInput);
      return await this.itemRepo.save(newItem);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async findAll(): Promise<Item[]> {
    // TODO: filter, paginar, por usuario
    return this.itemRepo.find();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemRepo.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(MESSAGE.NO_SE_ENCONTRO_ESTE_ITEM);
    }
    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    await this.findOne(id);
    const item = await this.itemRepo.preload(updateItemInput);
    return await this.itemRepo.save(item);
  }

  async remove(id: string): Promise<Item> {
    // TODO: soft delete, integridad referencial
    const item = await this.findOne(id);
    await this.itemRepo.remove(item);
    return { ...item, id };
  }
}
