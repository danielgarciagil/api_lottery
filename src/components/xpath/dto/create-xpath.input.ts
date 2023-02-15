import { InputType, Field, Int } from '@nestjs/graphql';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

@InputType()
export class CreateXpathInput {
  @Field(() => [String])
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  urls: string[];

  @Field(() => [[String]])
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  xpath_digitos: string[][];

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id_sorteo: number;
}
