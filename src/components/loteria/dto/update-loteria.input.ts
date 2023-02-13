import { CreateLoteriaInput } from './create-loteria.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLoteriaInput extends PartialType(CreateLoteriaInput) {
  @Field(() => Int)
  id: number;
}
