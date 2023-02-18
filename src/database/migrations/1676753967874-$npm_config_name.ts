import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1676753967874 implements MigrationInterface {
  name = '$npmConfigName1676753967874';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "so_a_bu" ADD "name" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "so_a_bu" DROP COLUMN "name"`);
  }
}
