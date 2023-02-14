import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//PROPIO

@Entity({ name: 'loteria' })
@ObjectType()
export class Loteria {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  abreviatura: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  img_url: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  descripcion: string;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  activo: boolean;
}
