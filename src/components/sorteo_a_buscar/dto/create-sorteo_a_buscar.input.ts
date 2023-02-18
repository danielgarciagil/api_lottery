import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSorteoABuscarInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
