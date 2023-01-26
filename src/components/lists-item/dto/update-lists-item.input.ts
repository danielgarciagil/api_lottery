import { IsUUID } from 'class-validator';
import { CreateListsItemInput } from './create-lists-item.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateListsItemInput extends PartialType(CreateListsItemInput) {
  @Field(() => String)
  @IsUUID()
  id: string;
}
