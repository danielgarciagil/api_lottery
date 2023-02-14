import { InputType, Field, Int } from '@nestjs/graphql';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  MinLength,
} from 'class-validator';
@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @Field(() => String)
  @MinLength(8)
  password: string;

  @Field(() => [Int])
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  role: number[];

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  nickname: string;
}
