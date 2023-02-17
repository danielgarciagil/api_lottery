import { IsNumber, Min } from 'class-validator';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

//PROPIO
import { CreateSorteoInput } from './create-sorteo.input';

@InputType()
export class UpdateSorteoInput extends PartialType(
  OmitType(CreateSorteoInput, ['id_juego', 'id_loteria'] as const),
) {
  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id: number;
}
