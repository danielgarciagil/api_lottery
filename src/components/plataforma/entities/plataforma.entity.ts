import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

//PROPIA
import { VALID_ENTITY } from './../../../config/valid-roles';
import { LotenetPremio } from './../../../components/lotenet-premios/entities/lotenet-premio.entity';

@Entity({ name: VALID_ENTITY.PLATAFORMA })
@ObjectType()
export class Plataforma {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  name: string;

  //todo encriptar esta contrasena
  @Field(() => String)
  @Column({ type: 'varchar' })
  password: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  url: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  descripcion: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  img_url: string;

  //todo revisar este lazy
  @Field(() => [LotenetPremio])
  @OneToMany(() => LotenetPremio, (lotenetPremio) => lotenetPremio.plataforma, {
    lazy: true,
  })
  lotenet_premio: LotenetPremio[];
}
