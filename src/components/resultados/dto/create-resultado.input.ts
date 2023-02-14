import { InputType, Int, Field } from '@nestjs/graphql';
import {
  ArrayMinSize,
  IsArray,
  //IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';

@InputType()
export class CreateResultadoInput {
  @Field(() => [Int])
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  numeros_ganadores: number[];

  @Field(() => Date)
  @IsDateString()
  fecha: Date;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id_sorteo: number;
}
