import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//PROPIO
import { CreateResponseSorteoABuscarInput } from './dto/create-response_sorteo_a_buscar.input';
import { UpdateResponseSorteoABuscarInput } from './dto/update-response_sorteo_a_buscar.input';
import { ResponseSorteoABuscar } from './entities/response_sorteo_a_buscar.entity';

@Injectable()
export class ResponseSorteoABuscarService {
  constructor(
    @InjectRepository(ResponseSorteoABuscar)
    private readonly responseRepository: Repository<ResponseSorteoABuscar>,
  ) {}

  //todo no tiene try
  async create(createResponseInput: CreateResponseSorteoABuscarInput) {
    const newResponse = this.responseRepository.create({
      message: createResponseInput.message,
      sorteo_a_buscar: { id: createResponseInput.id_sorteo_a_buscar },
    });
    return await this.responseRepository.save(newResponse);
  }

  async findAll() {
    return `This action returns all responseSorteoABuscar`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} responseSorteoABuscar`;
  }

  async update(
    id: number,
    updateResponseSorteoABuscarInput: UpdateResponseSorteoABuscarInput,
  ) {
    return `This action updates a #${id} responseSorteoABuscar`;
  }

  //remove(id: number) {
  //  return `This action removes a #${id} responseSorteoABuscar`;
  //}
}
