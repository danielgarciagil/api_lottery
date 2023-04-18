import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreatePlataformaInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  usuario: string;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  password: string;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  url: string;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  descripcion: string;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  @IsOptional()
  img_url: string;
}
