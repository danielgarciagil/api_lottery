import { MigrationInterface, QueryRunner } from 'typeorm';

export class defaultRol1674425504134 implements MigrationInterface {
  name = 'defaultRol1674425504134';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "roles" DROP DEFAULT`,
    );
  }
}
