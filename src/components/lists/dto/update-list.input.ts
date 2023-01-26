import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

//Prooio
import { CreateListInput } from './create-list.input';

@InputType()
export class UpdateListInput extends PartialType(CreateListInput) {
  @Field(() => String)
  @IsUUID()
  id: string;
}
