import { MigrationInterface, QueryRunner } from 'typeorm';

export class name1681227136664 implements MigrationInterface {
  name = 'name1681227136664';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTERIA" DROP CONSTRAINT "UQ_59f320fe61626dbf974da626e26"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTERIA" DROP CONSTRAINT "UQ_357d0d53d6d090df61cf82db91a"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTERIA" ADD CONSTRAINT "UQ_357d0d53d6d090df61cf82db91a" UNIQUE ("abreviatura")`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTERIA" ADD CONSTRAINT "UQ_59f320fe61626dbf974da626e26" UNIQUE ("name")`,
    );
  }
}
