import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateResponseLotenetPremioInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
