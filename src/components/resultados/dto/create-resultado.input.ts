import { InputType, Int, Field } from '@nestjs/graphql';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Matches,
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

  @Field(() => String)
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/) // Expresion regular para recibir la fecha en AAAA:MM:DD  2022-10-19
  fecha: Date;

  @Field(() => Int)
  @IsNumber()
  @Min(0)
  id_sorteo: number;

  //todo esto no va por aqui viene por el Req
  @Field(() => Int)
  @IsNumber()
  //@IsOptional()
  @Min(0)
  id_user: number;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
