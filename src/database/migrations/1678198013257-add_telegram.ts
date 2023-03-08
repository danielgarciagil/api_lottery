import { MigrationInterface, QueryRunner } from 'typeorm';

export class addTelegram1678198013257 implements MigrationInterface {
  name = 'addTelegram1678198013257';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "telegram_user" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "message_is_not_error" boolean NOT NULL DEFAULT true, "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_6c988145163051b51fd2fcc584c" UNIQUE ("user_id"), CONSTRAINT "PK_8e00b1def3edd3510248136f820" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "telegram_user"`);
  }
}
