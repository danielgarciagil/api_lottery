import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

//Poropias
import { CreateUserInput } from './create-user.input';
import { ValidRoles } from './../../../auth/enums/valid-roles.enum';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  @IsUUID()
  id: number;

  @Field(() => [ValidRoles], { nullable: true })
  @IsOptional()
  @IsArray() //TOdo controlar que solo me lleguede validROles
  @IsEnum(ValidRoles, { each: true })
  roles?: ValidRoles[];

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
