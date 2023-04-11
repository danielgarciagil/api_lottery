import { IsNumber } from 'class-validator';
import { CreateLoteriaInput } from './create-loteria.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateLoteriaInput extends PartialType(CreateLoteriaInput) {
  @Field(() => Int)
  @IsNumber()
  id: number;
}
