import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1682558933592 implements MigrationInterface {
  name = '$npmConfigName1682558933592';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "XPATH" ADD "verify_string_date" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "XPATH" DROP COLUMN "verify_string_date"`,
    );
  }
}
