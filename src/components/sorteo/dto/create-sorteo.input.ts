import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsNumber,
  IsString,
  Matches,
  Max,
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

  @Field(() => String)
  @IsString()
  @MinLength(3)
  img_url: string;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  descripcion: string;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/) // Expresion regular para recibir la hora en formato HH:mm
  hora: string;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  @Max(8)
  id_dia_semana: number;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id_juego: number;
}
