import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString, Min, MinLength } from 'class-validator';

@InputType()
export class CreateLotenetApiInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  longitud: number;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id_sorteo: number;
}

export class FilterSorteo {
  @IsString()
  name: string;
}
