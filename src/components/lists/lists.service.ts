import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const { limit, offset } = paginationArgs;
    return await this.listRepo.find({
      take: limit,
      skip: offset,
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  async findOne(id: string, user: User): Promise<List> {
    const list = await this.listRepo.findOneBy({
      id: id,
      user: {
        id: user.id,
      },
    });
    if (!list) {
      throw new NotFoundException(MESSAGE.NO_SE_ENCONTRO_ESTA_LISTA);
    }
    return list;
  }

  async update(
    id: string,
    updateListInput: UpdateListInput,
    user: User,
  ): Promise<List> {
    await this.findOne(id, user);
    const list = await this.listRepo.preload(updateListInput);
    return await this.listRepo.save(list);
  }

  async remove(id: string, user: User): Promise<List> {
    throw new BadRequestException(MESSAGE.FALTA_IMPLEMENTAR_ESTE_METODO);
    //return `This action removes a #${id} list`;
  }

  async listCountByUser(user: User): Promise<number> {
    return await this.listRepo.count({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }
}
