import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

//PROPIO
import { Sorteo } from './../../../components/sorteo/entities/sorteo.entity';
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

  @Field(() => String, { nullable: null })
  @Column({ type: 'varchar', nullable: true })
  img_url?: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  descripcion: string;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Field(() => [Sorteo])
  @OneToMany(() => Sorteo, (sorteo) => sorteo.loteria, { lazy: true })
  sorteo: Sorteo[];
}
