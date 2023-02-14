import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEntityDia1676388345477 implements MigrationInterface {
  name = 'addEntityDia1676388345477';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "dias" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_f0b62bd212476c096bd8276997b" UNIQUE ("name"), CONSTRAINT "PK_c3ec07a9d7a384961b1446b72f6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "sorteo" DROP COLUMN "hora"`);
    await queryRunner.query(`ALTER TABLE "sorteo" ADD "hora" TIME NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sorteo" DROP COLUMN "hora"`);
    await queryRunner.query(
      `ALTER TABLE "sorteo" ADD "hora" TIMESTAMP WITH TIME ZONE NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "dias"`);
  }
}
