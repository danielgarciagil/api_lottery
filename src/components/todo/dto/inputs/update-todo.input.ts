import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class UpdateTodoInput {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id: number;

  @Field(() => String, {
    description: 'Descripcion de la tarea',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  description?: string;

  @Field(() => Boolean, { nullable: true })
  done?: boolean;
}
