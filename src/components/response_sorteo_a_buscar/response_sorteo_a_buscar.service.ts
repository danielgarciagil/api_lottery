import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//PROPIO
import { CreateResponseSorteoABuscarInput } from './dto/create-response_sorteo_a_buscar.input';
import { UpdateResponseSorteoABuscarInput } from './dto/update-response_sorteo_a_buscar.input';
import { ResponseSorteoABuscar } from './entities/response_sorteo_a_buscar.entity';
import { PaginationArgs } from './../../common/dto/args';

@Injectable()
export class ResponseSorteoABuscarService {
  private logger: Logger = new Logger('Response-Sorteo-Service');
  constructor(
    @InjectRepository(ResponseSorteoABuscar)
    private readonly responseRepository: Repository<ResponseSorteoABuscar>,
  ) {}

  //todo no tiene try
  async create(createResponseInput: CreateResponseSorteoABuscarInput) {
    try {
      const newResponse = this.responseRepository.create({
        message: createResponseInput.message,
        sorteo_a_buscar: { id: createResponseInput.id_sorteo_a_buscar },
      });
      return await this.responseRepository.save(newResponse);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async findAll(
    paginationArgs: PaginationArgs,
  ): Promise<ResponseSorteoABuscar[]> {
    const { limit, offset } = paginationArgs;
    return await this.responseRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<ResponseSorteoABuscar> {
    const response = await this.responseRepository.findOneBy({ id });
    return response;
  }

  async update(
    id: number,
    updateResponseSorteoABuscarInput: UpdateResponseSorteoABuscarInput,
  ) {
    try {
      const response = await this.findOne(id);
      this.responseRepository.merge(response, updateResponseSorteoABuscarInput);
      return await this.responseRepository.save(response);
    } catch (error) {
      this.logger.error(error);
    }
  }

  //remove(id: number) {
  //  return `This action removes a #${id} responseSorteoABuscar`;
  //}
}
