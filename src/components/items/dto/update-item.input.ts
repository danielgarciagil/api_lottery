import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

//Propios
import { IsUUID } from 'class-validator';
import { CreateItemInput } from './create-item.input';
@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
