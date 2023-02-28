import { CreateResponseLotenetPremioInput } from './create-response-lotenet-premio.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateResponseLotenetPremioInput extends PartialType(CreateResponseLotenetPremioInput) {
  @Field(() => Int)
  id: number;
}
