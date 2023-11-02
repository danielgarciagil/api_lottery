import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString, Min, MinLength } from 'class-validator';

@InputType()
export class CreateLotenetHaitiApiInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id_sorteo_pick3: number;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id_sorteo_pick4: number;
}
