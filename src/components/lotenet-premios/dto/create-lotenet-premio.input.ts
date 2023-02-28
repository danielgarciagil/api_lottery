import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLotenetPremioInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
