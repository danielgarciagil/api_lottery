import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//Propio
import { VALID_ENTITY } from './../../../config/valid-roles';
import { Sorteo } from './../../../components/sorteo/entities/sorteo.entity';

@Entity({ name: VALID_ENTITY.LOTENET_API })
@ObjectType()
export class LotenetApi {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  longitud: number;

  @Field(() => Sorteo) //todo
  @OneToOne(() => Sorteo, (sorteo) => sorteo.lotenet_api, { lazy: true })
  @JoinColumn({ name: 'id_sorteo' })
  sorteo: Sorteo;
}
