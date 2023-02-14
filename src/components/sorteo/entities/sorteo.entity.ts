import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

//PROPIO
import { Juego } from './../../../components/juego/entities/juego.entity';
import { Dias } from './dias.entity';
import { Resultado } from './../../../components/resultados/entities/resultado.entity';

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
  @ManyToOne(() => Juego, (juego) => juego.sorteo, { eager: true }) //todo lazy
  @JoinColumn({ name: 'id_juego' })
  juego: Juego;

  @Field(() => Dias)
  @ManyToOne(() => Dias, (dias) => dias.sorteo, { lazy: true })
  @JoinColumn({ name: 'id_dia_semana' })
  dia_semana: Dias;

  @Field(() => [Resultado])
  @OneToMany(() => Resultado, (resultado) => resultado.sorteo, { lazy: true })
  resultados: Resultado[];
}
