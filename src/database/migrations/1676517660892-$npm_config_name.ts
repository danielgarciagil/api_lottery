import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1676517660892 implements MigrationInterface {
  name = '$npmConfigName1676517660892';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "xpath" ADD "xpath_fecha" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "xpath" DROP COLUMN "xpath_fecha"`);
  }
}
