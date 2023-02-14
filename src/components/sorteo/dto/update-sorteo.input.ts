import { IsNumber, Min } from 'class-validator';
import { CreateSorteoInput } from './create-sorteo.input';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateSorteoInput extends PartialType(
  OmitType(CreateSorteoInput, ['id_juego', 'id_dia_semana'] as const),
) {
  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id: number;
}
