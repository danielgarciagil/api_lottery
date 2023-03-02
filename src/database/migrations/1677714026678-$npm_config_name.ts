import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1677714026678 implements MigrationInterface {
  name = '$npmConfigName1677714026678';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" ADD "data_lotenet_name_loteria" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" DROP COLUMN "data_lotenet_name_loteria"`,
    );
  }
}
