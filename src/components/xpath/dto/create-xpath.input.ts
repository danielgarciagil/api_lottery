import { InputType, Field, Int } from '@nestjs/graphql';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateXpathInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  descripcion: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  verify_string_date: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  activo: boolean;

  @Field(() => [[String]])
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  xpath_digitos: string[][];

  @Field(() => [[String]])
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  xpath_urls_by_digitos: string[][];

  @Field(() => [[String]])
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  xpath_fecha_by_digitos: string[][];

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id_sorteo_a_buscar: number;
}
