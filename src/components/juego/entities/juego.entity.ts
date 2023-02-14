import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

//PROPIO
import { Loteria } from './../../../components/loteria/entities/loteria.entity';
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

  @Field(() => Loteria)
  @ManyToOne(() => Loteria, (loteria) => loteria.juego, { lazy: true })
  @JoinColumn({ name: 'id_loteria' })
  loteria: Loteria;

  @Field(() => [Sorteo])
  @OneToMany(() => Sorteo, (sorteo) => sorteo.juego, { lazy: true })
  sorteo: Sorteo[];
}
