import { MigrationInterface, QueryRunner } from 'typeorm';

export class editColumn1678291317133 implements MigrationInterface {
  name = 'editColumn1678291317133';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "telegram_user" DROP CONSTRAINT "UQ_6c988145163051b51fd2fcc584c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "telegram_user" DROP COLUMN "user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "telegram_user" ADD "user_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "telegram_user" ADD CONSTRAINT "UQ_6c988145163051b51fd2fcc584c" UNIQUE ("user_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "telegram_user" DROP CONSTRAINT "UQ_6c988145163051b51fd2fcc584c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "telegram_user" DROP COLUMN "user_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "telegram_user" ADD "user_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "telegram_user" ADD CONSTRAINT "UQ_6c988145163051b51fd2fcc584c" UNIQUE ("user_id")`,
    );
  }
}
