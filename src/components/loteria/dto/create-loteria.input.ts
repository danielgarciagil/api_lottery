import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateLoteriaInput {
  @Field(() => String)
  @IsString()
  @MinLength(3)
  name: string;

  @Field(() => String)
  @IsString()
  @MinLength(2)
  abreviatura: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @MinLength(3)
  @IsOptional()
  img_url?: string;

  @Field(() => String)
  @IsString()
  @MinLength(3)
  descripcion: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  mostrar_pantalla?: boolean;
}
