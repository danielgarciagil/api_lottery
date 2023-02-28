import { Injectable } from '@nestjs/common';
import { CreatePlataformaInput } from './dto/create-plataforma.input';
import { UpdatePlataformaInput } from './dto/update-plataforma.input';

@Injectable()
export class PlataformaService {
  create(createPlataformaInput: CreatePlataformaInput) {
    return 'This action adds a new plataforma';
  }

  findAll() {
    return `This action returns all plataforma`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plataforma`;
  }

  update(id: number, updatePlataformaInput: UpdatePlataformaInput) {
    return `This action updates a #${id} plataforma`;
  }

  remove(id: number) {
    return `This action removes a #${id} plataforma`;
  }
}
