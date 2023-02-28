import { CreatePlataformaInput } from './create-plataforma.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePlataformaInput extends PartialType(CreatePlataformaInput) {
  @Field(() => Int)
  id: number;
}
