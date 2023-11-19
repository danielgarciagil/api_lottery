import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

//PROPIO
import { Sorteo } from './../../../components/sorteo/entities/sorteo.entity';
import { VALID_ENTITY } from './../../../config/valid-roles';
@Entity({ name: VALID_ENTITY.LOTERIA })
@ObjectType()
export class Loteria {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  name: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  abreviatura: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  img_url?: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  descripcion: string;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: false })
  mostrar_pantalla: boolean;


  @Field(() => [Sorteo])
  @OneToMany(() => Sorteo, (sorteo) => sorteo.loteria, { lazy: true })
  sorteo: Sorteo[];
}
