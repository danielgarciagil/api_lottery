import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//Propios
import { CreateListInput } from './dto/create-list.input';
import { UpdateListInput } from './dto/update-list.input';
import { List } from './entities/list.entity';
import { MESSAGE } from './../../config/messages';
import { User } from '../users/entities/user.entity';
import { PaginationArgs } from './../../common/dto/args';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List) private readonly listRepo: Repository<List>,
  ) {}

  async create(createListInput: CreateListInput, user: User): Promise<List> {
    try {
      const newList = this.listRepo.create({ ...createListInput, user: user });
      return await this.listRepo.save(newList);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async findAll(user: User, paginationArgs: PaginationArgs): Promise<List[]> {
    throw new BadRequestException(MESSAGE.FALTA_IMPLEMENTAR_ESTE_METODO);
    //return `This action returns all lists`;
  }

  async findOne(id: string, user: User): Promise<List> {
    throw new BadRequestException(MESSAGE.FALTA_IMPLEMENTAR_ESTE_METODO);
    //return `This action returns a #${id} list`;
  }

  async update(
    id: string,
    updateListInput: UpdateListInput,
    user: User,
  ): Promise<List> {
    throw new BadRequestException(MESSAGE.FALTA_IMPLEMENTAR_ESTE_METODO);
    //return `This action updates a #${id} list`;
  }

  async remove(id: string, user: User): Promise<List> {
    throw new BadRequestException(MESSAGE.FALTA_IMPLEMENTAR_ESTE_METODO);
    //return `This action removes a #${id} list`;
  }
}
