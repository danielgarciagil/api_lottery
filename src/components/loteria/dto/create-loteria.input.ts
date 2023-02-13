import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLoteriaInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
