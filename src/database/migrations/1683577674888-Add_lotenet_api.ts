import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLotenetApi1683577674888 implements MigrationInterface {
  name = 'AddLotenetApi1683577674888';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "LOTENET_API" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "longitud" integer NOT NULL, CONSTRAINT "UQ_f295871ca6978a4f86cd43cd5b9" UNIQUE ("name"), CONSTRAINT "PK_6af36e2cfa23ad2a9e1b43e5d42" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "LOTENET_API"`);
  }
}
