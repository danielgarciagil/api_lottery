import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

//PROPIO

import { Sorteo } from './../../../components/sorteo/entities/sorteo.entity';

@Entity({ name: 'juego' })
@ObjectType()
export class Juego {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  name: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  abreviatura: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  descripcion: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  posiciones: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  rango_minimo: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  rango_maximo: number;

  @Field(() => [Sorteo])
  @OneToMany(() => Sorteo, (sorteo) => sorteo.juego, { lazy: true })
  sorteo: Sorteo[];

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  activo: boolean;
}
