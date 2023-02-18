import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

//PROPIO
import { VALID_DIAS } from '../../../config/valid-roles';
import { SorteoDias } from './../../sorteo_dias/entities/sorteo_dia.entity';

@Entity({ name: 'dias' })
@ObjectType()
export class Dias {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @Column({ type: 'enum', unique: true, enum: VALID_DIAS })
  name: VALID_DIAS;

  @OneToMany(() => SorteoDias, (sorteoDias) => sorteoDias.dias)
  sorteo_dias: SorteoDias[];
}
