import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateJuegoInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => String)
  @IsString()
  @MinLength(2)
  abreviatura: string;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  descripcion: string;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  posiciones: number;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  rango_minimo: number;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  rango_maximo: number;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
