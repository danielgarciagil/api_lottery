import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//PROPIO
import { Dias } from './entity/dias.entity';
import { PaginationArgs } from './../../common/dto/args';
import { MESSAGE } from './../../config/messages';

@Injectable()
export class DiasService {
  constructor(
    @InjectRepository(Dias) private readonly diasRepository: Repository<Dias>,
  ) {}

  async findAll(paginationArgs: PaginationArgs): Promise<Dias[]> {
    const { limit, offset } = paginationArgs;
    return await this.diasRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<Dias> {
    const dia = await this.diasRepository.findOneBy({ id });
    if (!dia) {
      throw new NotFoundException(MESSAGE.COMUN_ESTE_ID_NO_EXISTE);
    }
    return dia;
  }
}
