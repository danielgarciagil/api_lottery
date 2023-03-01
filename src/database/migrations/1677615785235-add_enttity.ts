import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEnttity1677615785235 implements MigrationInterface {
  name = 'addEnttity1677615785235';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "premio_dias" ("id" SERIAL NOT NULL, "hora" TIME NOT NULL, "id_dias" integer, CONSTRAINT "PK_e24b05b187a9e0967d8230cf264" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "premio_dias" ADD CONSTRAINT "FK_b7399acbe4ce7c8971ce34f2a2f" FOREIGN KEY ("id_dias") REFERENCES "DIA"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "premio_dias" DROP CONSTRAINT "FK_b7399acbe4ce7c8971ce34f2a2f"`,
    );
    await queryRunner.query(`DROP TABLE "premio_dias"`);
  }
}
