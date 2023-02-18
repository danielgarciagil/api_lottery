import { InputType, Int, Field } from '@nestjs/graphql';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateSorteoInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => String)
  @IsString()
  @MinLength(2)
  abreviatura: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @MinLength(3)
  @IsOptional()
  img_url?: string;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  descripcion: string;

  //@Field(() => [Int])
  //@IsArray()
  //@IsNumber({}, { each: true })
  //@ArrayMinSize(1)
  //ids_dia_semanas: number[];

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id_juego: number;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id_loteria: number;
}
