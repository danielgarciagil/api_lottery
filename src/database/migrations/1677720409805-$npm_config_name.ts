import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1677720409805 implements MigrationInterface {
  name = '$npmConfigName1677720409805';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "PLATAFORMA" ADD "usuario" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "PLATAFORMA" DROP COLUMN "usuario"`);
  }
}
