import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1677200874766 implements MigrationInterface {
  name = '$npmConfigName1677200874766';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "res_sor_bus" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "completed" boolean NOT NULL DEFAULT false, "is_error" boolean NOT NULL DEFAULT false, "activo" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a1c3e1e09f3a6e24b1048a4627c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "XPATH" ALTER COLUMN "buscando" SET DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "XPATH" ALTER COLUMN "buscando" SET DEFAULT true`,
    );
    await queryRunner.query(`DROP TABLE "res_sor_bus"`);
  }
}
