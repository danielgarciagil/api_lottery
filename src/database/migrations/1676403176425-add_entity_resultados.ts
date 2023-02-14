import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEntityResultados1676403176425 implements MigrationInterface {
  name = 'addEntityResultados1676403176425';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "resultados" ("id" SERIAL NOT NULL, "numeros_ganadores" integer array NOT NULL, "fecha" TIMESTAMP WITH TIME ZONE NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b5c208f402f18d0ac82ae19b0d2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "resultados"`);
  }
}
