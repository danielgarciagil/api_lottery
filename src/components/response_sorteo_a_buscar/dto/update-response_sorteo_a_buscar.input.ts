import { IsOptional } from 'class-validator';
import { CreateResponseSorteoABuscarInput } from './create-response_sorteo_a_buscar.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateResponseSorteoABuscarInput extends PartialType(
  CreateResponseSorteoABuscarInput,
) {
  @Field(() => Int)
  id: number;

  @IsOptional()
  message?: string;
}
