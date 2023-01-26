import { CreateListsItemInput } from './create-lists-item.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateListsItemInput extends PartialType(CreateListsItemInput) {
  @Field(() => Int)
  id: number;
}
