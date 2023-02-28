import { Injectable } from '@nestjs/common';
import { CreateResponseLotenetPremioInput } from './dto/create-response-lotenet-premio.input';
import { UpdateResponseLotenetPremioInput } from './dto/update-response-lotenet-premio.input';

@Injectable()
export class ResponseLotenetPremioService {
  create(createResponseLotenetPremioInput: CreateResponseLotenetPremioInput) {
    return 'This action adds a new responseLotenetPremio';
  }

  findAll() {
    return `This action returns all responseLotenetPremio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} responseLotenetPremio`;
  }

  update(id: number, updateResponseLotenetPremioInput: UpdateResponseLotenetPremioInput) {
    return `This action updates a #${id} responseLotenetPremio`;
  }

  remove(id: number) {
    return `This action removes a #${id} responseLotenetPremio`;
  }
}
