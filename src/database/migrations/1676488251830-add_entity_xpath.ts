import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEntityXpath1676488251830 implements MigrationInterface {
  name = 'addEntityXpath1676488251830';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "xpath" ("id" SERIAL NOT NULL, "urls" character varying array NOT NULL, "xpath_digitos" character varying array NOT NULL, CONSTRAINT "PK_c75a940d9064883c634bb2f8b21" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "xpath"`);
  }
}
