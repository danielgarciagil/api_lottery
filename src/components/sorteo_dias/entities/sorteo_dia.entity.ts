import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sorteo } from './../../sorteo/entities/sorteo.entity';
import { Dias } from './../../dias/entity/dias.entity';

//PROPIO

@Entity({ name: 'sorteo_dias' })
@ObjectType()
export class SorteoDias {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @Column({ type: 'time' })
  hora: string;

  //@Field(() => Sorteo)
  @ManyToOne(() => Sorteo, (sorteo) => sorteo.sorteo_dias)
  @JoinColumn({ name: ' id_sorteo' })
  sorteo: Sorteo;

  @Field(() => Dias)
  @ManyToOne(() => Dias, (dias) => dias.sorteo_dias, { eager: true })
  @JoinColumn({ name: 'id_dias' })
  dias: Dias;
}
