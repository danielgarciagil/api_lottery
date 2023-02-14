import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//PROPIO
import { Sorteo } from './../../../components/sorteo/entities/sorteo.entity';

@Entity({ name: 'resultados' })
@ObjectType()
export class Resultado {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => [Int])
  @Column({ type: 'int', array: true })
  numeros_ganadores: number[];

  @Field(() => Date)
  @Column({ type: 'timestamptz' })
  fecha: Date;

  @Field(() => Sorteo)
  @ManyToOne(() => Sorteo, (sorteo) => sorteo.resultados, { lazy: true })
  @JoinColumn({ name: 'id_sorteo' })
  sorteo: Sorteo;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
