import { InputType, Field, PartialType } from '@nestjs/graphql';

//Prooio
import { IsUUID } from 'class-validator';
import { CreateListInput } from './create-list.input';

@InputType()
export class UpdateListInput extends PartialType(CreateListInput) {
  @Field(() => String)
  @IsUUID()
  id: string;
}
