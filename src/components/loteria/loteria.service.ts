import { Injectable } from '@nestjs/common';
import { CreateLoteriaInput } from './dto/create-loteria.input';
import { UpdateLoteriaInput } from './dto/update-loteria.input';

@Injectable()
export class LoteriaService {
  create(createLoteriaInput: CreateLoteriaInput) {
    return 'This action adds a new loteria';
  }

  findAll() {
    return `This action returns all loteria`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loteria`;
  }

  update(id: number, updateLoteriaInput: UpdateLoteriaInput) {
    return `This action updates a #${id} loteria`;
  }

  remove(id: number) {
    return `This action removes a #${id} loteria`;
  }
}
