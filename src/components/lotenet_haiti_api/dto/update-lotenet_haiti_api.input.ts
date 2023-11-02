import { CreateLotenetHaitiApiInput } from './create-lotenet_haiti_api.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLotenetHaitiApiInput extends PartialType(CreateLotenetHaitiApiInput) {
  @Field(() => Int)
  id: number;
}
