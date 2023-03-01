import { CreateLotenetPremioInput } from './create-lotenet-premio.input';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateLotenetPremioInput extends PartialType(
  OmitType(CreateLotenetPremioInput, ['id_plataforma', 'id_sorteo'] as const),
) {
  @Field(() => Int)
  id: number;
}
