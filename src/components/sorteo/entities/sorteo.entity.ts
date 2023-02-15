import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//PROPIO
import { Juego } from './../../../components/juego/entities/juego.entity';
import { Dias } from './dias.entity';
import { Resultado } from './../../../components/resultados/entities/resultado.entity';
import { Loteria } from './../../../components/loteria/entities/loteria.entity';
import { Xpath } from './../../../components/xpath/entities/xpath.entity';

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

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  img_url?: string;

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

  //TODO cambiar que esta relacion sea de miucho a mucho
  @Field(() => [Dias])
  @ManyToMany(() => Dias, (dias) => dias.sorteo, { lazy: true })
  @JoinTable({
    name: 'sor_dia',
  })
  dia_semana: Dias[];

  @Field(() => [Resultado])
  @OneToMany(() => Resultado, (resultado) => resultado.sorteo, { lazy: true })
  resultados: Resultado[];

  @Field(() => Loteria)
  @ManyToOne(() => Loteria, (loteria) => loteria.sorteo, { lazy: true })
  @JoinColumn({ name: 'id_loteria' })
  loteria: Loteria;

  //TODO no lo puse en el graphql
  @OneToOne(() => Xpath, (xpath) => xpath.sorteo)
  xpath: Xpath;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  activo: boolean;
}
