import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//Propio

@Entity({ name: 'role' })
@ObjectType({ description: 'Entidad de Roles' })
export class Role {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  name: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  descripcion: string;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: true })
  activo: boolean;
}
