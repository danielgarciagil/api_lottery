import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEntityRoles1676317035152 implements MigrationInterface {
  name = 'addEntityRoles1676317035152';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "permiso_accion" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "method" character varying NOT NULL, "entity" character varying NOT NULL, "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_89609d36a856790dc2d5992893e" UNIQUE ("name"), CONSTRAINT "PK_da51b1302253e1c93caf85bfc69" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "descripcion" character varying NOT NULL, "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "permiso_accion"`);
  }
}
