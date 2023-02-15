import { Injectable } from '@nestjs/common';
import { CreateXpathInput } from './dto/create-xpath.input';
import { UpdateXpathInput } from './dto/update-xpath.input';

@Injectable()
export class XpathService {
  create(createXpathInput: CreateXpathInput) {
    return 'This action adds a new xpath';
  }

  findAll() {
    return `This action returns all xpath`;
  }

  findOne(id: number) {
    return `This action returns a #${id} xpath`;
  }

  update(id: number, updateXpathInput: UpdateXpathInput) {
    return `This action updates a #${id} xpath`;
  }

  remove(id: number) {
    return `This action removes a #${id} xpath`;
  }
}
