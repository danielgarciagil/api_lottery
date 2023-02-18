import { Injectable } from '@nestjs/common';
import { CreateSorteoABuscarInput } from './dto/create-sorteo_a_buscar.input';
import { UpdateSorteoABuscarInput } from './dto/update-sorteo_a_buscar.input';

@Injectable()
export class SorteoABuscarService {
  create(createSorteoABuscarInput: CreateSorteoABuscarInput) {
    return 'This action adds a new sorteoABuscar';
  }

  findAll() {
    return `This action returns all sorteoABuscar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sorteoABuscar`;
  }

  update(id: number, updateSorteoABuscarInput: UpdateSorteoABuscarInput) {
    return `This action updates a #${id} sorteoABuscar`;
  }

  remove(id: number) {
    return `This action removes a #${id} sorteoABuscar`;
  }
}
