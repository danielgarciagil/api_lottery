import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class SignupInput {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(5)
  fullName: string;

  @Field(() => String)
  @MinLength(8)
  password: string;

  @Field(() => [String])
  @IsArray()
  roles: string[];
}
