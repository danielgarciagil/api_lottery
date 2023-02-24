import { InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateResponseSorteoABuscarInput {
  @IsString()
  message: string;

  @IsNumber()
  id_sorteo_a_buscar: number;
}
