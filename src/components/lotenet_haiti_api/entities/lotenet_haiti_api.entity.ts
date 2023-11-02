import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { VALID_ENTITY } from './../../../config/valid-roles';

@Entity({ name: VALID_ENTITY.LOTENET_HAITI_API })
@ObjectType()
export class LotenetHaitiApi {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  id_sorteo_pick3: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  id_sorteo_pick4: number;
}
