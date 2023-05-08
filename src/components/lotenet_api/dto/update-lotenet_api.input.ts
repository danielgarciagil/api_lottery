import { CreateLotenetApiInput } from './create-lotenet_api.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLotenetApiInput extends PartialType(CreateLotenetApiInput) {
  @Field(() => Int)
  id: number;
}
