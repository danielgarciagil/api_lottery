import { CreatePremiosDiaInput } from './create-premios-dia.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePremiosDiaInput extends PartialType(CreatePremiosDiaInput) {
  @Field(() => Int)
  id: number;
}
