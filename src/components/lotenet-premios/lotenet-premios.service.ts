import { Injectable } from '@nestjs/common';
import { CreateLotenetPremioInput } from './dto/create-lotenet-premio.input';
import { UpdateLotenetPremioInput } from './dto/update-lotenet-premio.input';

@Injectable()
export class LotenetPremiosService {
  create(createLotenetPremioInput: CreateLotenetPremioInput) {
    return 'This action adds a new lotenetPremio';
  }

  findAll() {
    return `This action returns all lotenetPremios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lotenetPremio`;
  }

  update(id: number, updateLotenetPremioInput: UpdateLotenetPremioInput) {
    return `This action updates a #${id} lotenetPremio`;
  }

  remove(id: number) {
    return `This action removes a #${id} lotenetPremio`;
  }
}
