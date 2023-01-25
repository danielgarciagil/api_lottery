import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

//Propios
import { ValidRoles } from '../enums/valid-roles.enum';

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

  @Field(() => [ValidRoles])
  @IsArray() //TOdo controlar que solo me lleguede validROles
  @IsEnum(ValidRoles, { each: true })
  roles: ValidRoles[];
}
