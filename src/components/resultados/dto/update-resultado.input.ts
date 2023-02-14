import { CreateResultadoInput } from './create-resultado.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateResultadoInput extends PartialType(CreateResultadoInput) {
  @Field(() => Int)
  id: number;
}
