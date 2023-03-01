import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

//PROPIO
import { VALID_DIAS } from '../../../config/valid-roles';
import { SorteoDias } from './../../sorteo_dias/entities/sorteo_dia.entity';
import { VALID_ENTITY } from '../../../config/valid-roles';
import { PremiosDia } from './../../../components/premios-dias/entities/premios-dia.entity';

@Entity({ name: VALID_ENTITY.DIA })
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

  @OneToMany(() => PremiosDia, (premioDias) => premioDias.dias)
  premios_dias: PremiosDia[];
}
