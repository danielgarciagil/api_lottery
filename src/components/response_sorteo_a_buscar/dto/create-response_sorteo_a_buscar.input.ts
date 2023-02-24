import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateResponseSorteoABuscarInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
