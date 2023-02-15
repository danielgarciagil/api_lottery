import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelacion1676488558251 implements MigrationInterface {
  name = 'addRelacion1676488558251';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "xpath" ("id" SERIAL NOT NULL, "urls" character varying array NOT NULL, "xpath_digitos" character varying array NOT NULL, "id_sorteo" integer, CONSTRAINT "REL_d41859e0f9a26cbc4ae2ee5b33" UNIQUE ("id_sorteo"), CONSTRAINT "PK_c75a940d9064883c634bb2f8b21" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "xpath" ADD CONSTRAINT "FK_d41859e0f9a26cbc4ae2ee5b338" FOREIGN KEY ("id_sorteo") REFERENCES "sorteo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "xpath" DROP CONSTRAINT "FK_d41859e0f9a26cbc4ae2ee5b338"`,
    );
    await queryRunner.query(`DROP TABLE "xpath"`);
  }
}
