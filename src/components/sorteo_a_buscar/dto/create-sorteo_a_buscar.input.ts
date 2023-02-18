import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateSorteoABuscarInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  activo: boolean;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  numeros_intentos: number;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  tiempo_de_espera_segundos: number;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  id_sorteo: number;
}
