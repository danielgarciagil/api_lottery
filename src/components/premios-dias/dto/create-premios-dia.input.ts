import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePremiosDiaInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
