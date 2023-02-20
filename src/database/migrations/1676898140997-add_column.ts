import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumn1676898140997 implements MigrationInterface {
  name = 'addColumn1676898140997';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "XPATH" ADD "buscando" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "XPATH" DROP COLUMN "buscando"`);
  }
}
