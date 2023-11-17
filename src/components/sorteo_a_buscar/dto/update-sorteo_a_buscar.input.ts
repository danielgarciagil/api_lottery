import { CreateSorteoABuscarInput } from './create-sorteo_a_buscar.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSorteoABuscarInput extends PartialType(
  CreateSorteoABuscarInput,
) {
  @Field(() => Int)
  id: number;
}
