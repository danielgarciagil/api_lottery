import { Injectable } from '@nestjs/common';
import { CreateSorteoDiaInput } from './dto/create-sorteo_dia.input';
import { UpdateSorteoDiaInput } from './dto/update-sorteo_dia.input';

@Injectable()
export class SorteoDiasService {
  create(createSorteoDiaInput: CreateSorteoDiaInput) {
    return 'This action adds a new sorteoDia';
  }

  findAll() {
    return `This action returns all sorteoDias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sorteoDia`;
  }

  update(id: number, updateSorteoDiaInput: UpdateSorteoDiaInput) {
    return `This action updates a #${id} sorteoDia`;
  }

  remove(id: number) {
    return `This action removes a #${id} sorteoDia`;
  }
}
