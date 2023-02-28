import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEnttity1677613346846 implements MigrationInterface {
  name = 'addEnttity1677613346846';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "LOTENET_PREMIO" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "activo" boolean NOT NULL DEFAULT true, "lotenet_id_lottery" integer NOT NULL, "lotenet_name_sorteo" integer NOT NULL, CONSTRAINT "PK_16414c40d3606a16fa7911ce1aa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "PLATAFORMA" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "url" character varying NOT NULL, "descripcion" character varying NOT NULL, "img_url" character varying NOT NULL, CONSTRAINT "PK_2ad88003db152a9d07dd176a0e1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "res_lot_pre" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "completed" boolean NOT NULL DEFAULT false, "is_error" boolean NOT NULL DEFAULT false, "activo" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6e68a7e2b8a72c2220ce081bebe" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "res_lot_pre"`);
    await queryRunner.query(`DROP TABLE "PLATAFORMA"`);
    await queryRunner.query(`DROP TABLE "LOTENET_PREMIO"`);
  }
}
