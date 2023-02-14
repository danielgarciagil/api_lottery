import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//PROPIO
import { Juego } from './../../../components/juego/entities/juego.entity';
import { Dias } from './dias.entity';

@Entity({ name: 'sorteo' })
@ObjectType()
export class Sorteo {
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
  img_url: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  descripcion: string;

  @Field(() => String)
  @Column({ type: 'time' })
  hora: string;

  @Field(() => Juego)
  @ManyToOne(() => Juego, (juego) => juego.sorteo, { lazy: true })
  @JoinColumn({ name: 'id_juego' })
  juego: Juego;

  @Field(() => Dias)
  @ManyToOne(() => Dias, (dias) => dias.sorteo, { lazy: true })
  @JoinColumn({ name: 'id_dia_semana' })
  dia_semana: Dias;
}
