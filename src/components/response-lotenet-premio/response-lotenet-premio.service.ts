import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

//PROPIO
import { CreateResponseLotenetPremioInput } from './dto/create-response-lotenet-premio.input';
import { UpdateResponseLotenetPremioInput } from './dto/update-response-lotenet-premio.input';
import { PaginationArgs } from './../../common/dto/args';
import { ResponseLotenetPremio } from './entities/response-lotenet-premio.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ResponseLotenetPremioService {
  private logger: Logger = new Logger('Response-Sorteo-Service');

  constructor(
    @InjectRepository(ResponseLotenetPremio)
    private readonly responseLotenetPremioRepository: Repository<ResponseLotenetPremio>,
  ) {}

  async create(
    createResponseLotenetPremioInput: CreateResponseLotenetPremioInput,
  ): Promise<ResponseLotenetPremio> {
    try {
      const newResponse = this.responseLotenetPremioRepository.create({
        message: createResponseLotenetPremioInput.message || 'SE INSTANCIO',
        lotenet_premio: {
          id: createResponseLotenetPremioInput.id_lotenet_premio,
        },
      });
      return await this.responseLotenetPremioRepository.save(newResponse);
    } catch (error) {
      this.logger.error(error?.message);
    }
  }

  async findAll(
    paginationArgs: PaginationArgs,
  ): Promise<ResponseLotenetPremio[]> {
    const { limit, offset } = paginationArgs;
    return await this.responseLotenetPremioRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<ResponseLotenetPremio> {
    const response = await this.responseLotenetPremioRepository.findOneBy({
      id,
    });
    return response;
  }

  async update(
    id: number,
    updateResponseLotenetPremioInput: UpdateResponseLotenetPremioInput,
  ): Promise<ResponseLotenetPremio> {
    try {
      const response = await this.findOne(id);
      this.responseLotenetPremioRepository.merge(
        response,
        updateResponseLotenetPremioInput,
      );
      return await this.responseLotenetPremioRepository.save(response);
    } catch (error) {
      this.logger.error(error?.message);
    }
  }

  //async remove(id: number) {
  //  return `This action removes a #${id} responseLotenetPremio`;
  //}
}
