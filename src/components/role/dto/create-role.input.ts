import { InputType, Int, Field } from '@nestjs/graphql';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateRoleInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  descripcion: string;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => [Int])
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  permiso_accion: number[];
}
