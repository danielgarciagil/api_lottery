import { InputType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateResponseSorteoABuscarInput {
  @IsString()
  message?: string;

  @IsNumber()
  id_sorteo_a_buscar: number;

  @IsBoolean()
  completed?: boolean;

  @IsBoolean()
  is_error?: boolean;
}
