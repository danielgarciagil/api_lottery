import { Injectable } from '@nestjs/common';
import { CreateResponseSorteoABuscarInput } from './dto/create-response_sorteo_a_buscar.input';
import { UpdateResponseSorteoABuscarInput } from './dto/update-response_sorteo_a_buscar.input';

@Injectable()
export class ResponseSorteoABuscarService {
  create(createResponseSorteoABuscarInput: CreateResponseSorteoABuscarInput) {
    return 'This action adds a new responseSorteoABuscar';
  }

  findAll() {
    return `This action returns all responseSorteoABuscar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} responseSorteoABuscar`;
  }

  update(id: number, updateResponseSorteoABuscarInput: UpdateResponseSorteoABuscarInput) {
    return `This action updates a #${id} responseSorteoABuscar`;
  }

  remove(id: number) {
    return `This action removes a #${id} responseSorteoABuscar`;
  }
}
