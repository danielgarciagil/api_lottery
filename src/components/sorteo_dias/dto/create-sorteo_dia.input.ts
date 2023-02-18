import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSorteoDiaInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
