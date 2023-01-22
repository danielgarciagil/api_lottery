import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'Descripcion de la tarea' })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(50)
  description: string;
}
