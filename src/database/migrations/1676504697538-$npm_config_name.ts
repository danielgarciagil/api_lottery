import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1676504697538 implements MigrationInterface {
  name = '$npmConfigName1676504697538';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sorteo" DROP CONSTRAINT "FK_895b7d489d374cf014d92d94a2f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sorteo" RENAME COLUMN "id_dia_semana" TO "activo"`,
    );
    await queryRunner.query(
      `CREATE TABLE "sor_dia" ("sorteoId" integer NOT NULL, "diasId" integer NOT NULL, CONSTRAINT "PK_2cb6fa72c01b1682fe3636e6cfa" PRIMARY KEY ("sorteoId", "diasId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_78526bd0eb187f6d4108eabe01" ON "sor_dia" ("sorteoId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_acc96eb2a63076a30829fc0f50" ON "sor_dia" ("diasId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "juego" ADD "activo" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "xpath" ADD "activo" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(`ALTER TABLE "sorteo" DROP COLUMN "activo"`);
    await queryRunner.query(
      `ALTER TABLE "sorteo" ADD "activo" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "sor_dia" ADD CONSTRAINT "FK_78526bd0eb187f6d4108eabe01b" FOREIGN KEY ("sorteoId") REFERENCES "sorteo"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "sor_dia" ADD CONSTRAINT "FK_acc96eb2a63076a30829fc0f50b" FOREIGN KEY ("diasId") REFERENCES "dias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sor_dia" DROP CONSTRAINT "FK_acc96eb2a63076a30829fc0f50b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sor_dia" DROP CONSTRAINT "FK_78526bd0eb187f6d4108eabe01b"`,
    );
    await queryRunner.query(`ALTER TABLE "sorteo" DROP COLUMN "activo"`);
    await queryRunner.query(`ALTER TABLE "sorteo" ADD "activo" integer`);
    await queryRunner.query(`ALTER TABLE "xpath" DROP COLUMN "activo"`);
    await queryRunner.query(`ALTER TABLE "juego" DROP COLUMN "activo"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_acc96eb2a63076a30829fc0f50"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_78526bd0eb187f6d4108eabe01"`,
    );
    await queryRunner.query(`DROP TABLE "sor_dia"`);
    await queryRunner.query(
      `ALTER TABLE "sorteo" RENAME COLUMN "activo" TO "id_dia_semana"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sorteo" ADD CONSTRAINT "FK_895b7d489d374cf014d92d94a2f" FOREIGN KEY ("id_dia_semana") REFERENCES "dias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
