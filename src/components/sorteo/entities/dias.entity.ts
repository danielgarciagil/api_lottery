import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

//PROPIO
import { Sorteo } from './sorteo.entity';

@Entity({ name: 'dias' })
@ObjectType()
export class Dias {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  name: string;

  @OneToMany(() => Sorteo, (sorteo) => sorteo.dia_semana, { lazy: true })
  sorteo: Sorteo[];
}
