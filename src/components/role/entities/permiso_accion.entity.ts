import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//PROPIO
import {
  ENTITY,
  VALID_METHOD,
  VALID_ROLES,
} from './../../../config/valid-roles';

@Entity({ name: 'permiso_accion' })
@ObjectType({ description: 'Entidad de los permisos con las acciones' })
export class Permiso_Accion {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  //TODO validar que solo sea un ENUM
  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  name: VALID_ROLES;

  //TODO validar que solo sea un ENUM
  @Field(() => String)
  @Column({ type: 'varchar' })
  method: VALID_METHOD;

  //TODO validar que solo sea un ENUM
  @Field(() => String)
  @Column({ type: 'varchar' })
  entity: ENTITY;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  activo: boolean;
}
