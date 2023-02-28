import { CreateLotenetPremioInput } from './create-lotenet-premio.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLotenetPremioInput extends PartialType(CreateLotenetPremioInput) {
  @Field(() => Int)
  id: number;
}
