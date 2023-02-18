import { CreateSorteoDiaInput } from './create-sorteo_dia.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSorteoDiaInput extends PartialType(CreateSorteoDiaInput) {
  @Field(() => Int)
  id: number;
}
