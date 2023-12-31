import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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
  @Field(() => Int)
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

  @Field(() => Number)
  @Column({ type: 'int' })
  lotenet_numero_posiciones_premio: number;

  @Field(() => Number)
  @Column({ type: 'int' })
  lotenet_numero_digitos_premio: number;

  @Field(() => Number)
  @Column({ type: 'int' })
  numeros_intentos: number;

  @Field(() => Number)
  @Column({ type: 'int' })
  tiempo_de_espera_segundos: number;

  @Field(() => Sorteo)
  @ManyToOne(() => Sorteo, (sorteo) => sorteo.lotenet_premio, {
    eager: true,
  })
  @JoinColumn({ name: 'id_sorteo' })
  sorteo: Sorteo;

  //todo field
  @Field(() => [PremiosDia])
  @OneToMany(() => PremiosDia, (premiosDia) => premiosDia.lotenet_premio, {
    eager: true,
  })
  premio_dia: PremiosDia[];

  @Field(() => Plataforma)
  @ManyToOne(() => Plataforma, (plataforma) => plataforma.lotenet_premio, {
    eager: true,
  })
  @JoinColumn({ name: 'id_plataforma' })
  plataforma: Plataforma;

  @OneToMany(
    () => ResponseLotenetPremio,
    (responseLotenetPremio) => responseLotenetPremio.lotenet_premio,
    { eager: true },
  )
  response_lotenet_premio: ResponseLotenetPremio;
}
