import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//PROPIO
import { VALID_ENTITY } from './../../../config/valid-roles';
import { Sorteo } from './../../../components/sorteo/entities/sorteo.entity';
import { PremiosDia } from './../../../components/premios-dias/entities/premios-dia.entity';
import { Plataforma } from './../../../components/plataforma/entities/plataforma.entity';
import { ResponseLotenetPremio } from './../../../components/response-lotenet-premio/entities/response-lotenet-premio.entity';

@Entity({ name: VALID_ENTITY.LOTENET_PREMIO })
@ObjectType()
export class LotenetPremio {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  name: string;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Field(() => Int)
  @Column({ type: 'int' })
  data_lotenet_id_lottery: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  data_lotenet_name_sorteo: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  data_lotenet_name_loteria: string;

  @Field(() => Sorteo)
  @OneToOne(() => Sorteo, (sorteo) => sorteo.lotenet_premio, {
    eager: true,
  })
  @JoinColumn({ name: 'id_sorteo' })
  sorteo: Sorteo;

  //todo field
  @Field(() => [PremiosDia])
  @OneToMany(() => PremiosDia, (premiosDia) => premiosDia.lotenet_premio, {
    eager: true,
  })
  premio_dia: PremiosDia;

  @Field(() => Plataforma)
  @ManyToOne(() => Plataforma, (plataforma) => plataforma.lotenet_premio, {
    eager: true,
  })
  plataforma: Plataforma;

  @OneToMany(
    () => ResponseLotenetPremio,
    (responseLotenetPremio) => responseLotenetPremio.lotenet_premio,
    { eager: true },
  )
  response_lotenet_premio: ResponseLotenetPremio;
}
