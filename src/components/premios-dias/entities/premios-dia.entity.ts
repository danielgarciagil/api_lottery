import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//PROPIO
import { Dias } from './../../../components/dias/entity/dias.entity';
import { LotenetPremio } from './../../../components/lotenet-premios/entities/lotenet-premio.entity';

@Entity({ name: 'premio_dias' })
@ObjectType()
export class PremiosDia {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @Column({ type: 'time' })
  hora: string;

  @Field(() => Dias)
  @ManyToOne(() => Dias, (dias) => dias.premios_dias, { eager: true })
  @JoinColumn({ name: 'id_dias' })
  dias: Dias;

  //todo no tiene FIELD
  @ManyToOne(() => LotenetPremio, (lotenetPremio) => lotenetPremio.premio_dia)
  lotenet_premio: LotenetPremio;
}
