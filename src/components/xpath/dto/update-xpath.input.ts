import { CreateXpathInput } from './create-xpath.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateXpathInput extends PartialType(CreateXpathInput) {
  @Field(() => Int)
  id: number;
}
