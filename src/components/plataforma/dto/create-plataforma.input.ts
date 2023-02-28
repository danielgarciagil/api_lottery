import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePlataformaInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
