import { MigrationInterface, QueryRunner } from 'typeorm';

export class editDate1677787154997 implements MigrationInterface {
  name = 'editDate1677787154997';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "RESULTADO" ("id" SERIAL NOT NULL, "numeros_ganadores" integer array NOT NULL, "fecha" TIMESTAMP WITH TIME ZONE NOT NULL, "activo" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id_sorteo" integer, "id_user" integer, CONSTRAINT "PK_a454545367dc8666b4eb8ceaac0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "RESULTADO" ADD CONSTRAINT "FK_d324c497327d4d8d55c5aaf7619" FOREIGN KEY ("id_sorteo") REFERENCES "SORTEO"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "RESULTADO" ADD CONSTRAINT "FK_d515e571e26f45ea4c6b254a5f3" FOREIGN KEY ("id_user") REFERENCES "USER"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "RESULTADO" DROP CONSTRAINT "FK_d515e571e26f45ea4c6b254a5f3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "RESULTADO" DROP CONSTRAINT "FK_d324c497327d4d8d55c5aaf7619"`,
    );
    await queryRunner.query(`DROP TABLE "RESULTADO"`);
  }
}
