import { Injectable } from '@nestjs/common';
import { CreatePremiosDiaInput } from './dto/create-premios-dia.input';
import { UpdatePremiosDiaInput } from './dto/update-premios-dia.input';

@Injectable()
export class PremiosDiasService {
  create(createPremiosDiaInput: CreatePremiosDiaInput) {
    return 'This action adds a new premiosDia';
  }

  findAll() {
    return `This action returns all premiosDias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} premiosDia`;
  }

  update(id: number, updatePremiosDiaInput: UpdatePremiosDiaInput) {
    return `This action updates a #${id} premiosDia`;
  }

  remove(id: number) {
    return `This action removes a #${id} premiosDia`;
  }
}
