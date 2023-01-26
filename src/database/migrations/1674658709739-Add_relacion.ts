import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelacion1674658709739 implements MigrationInterface {
  name = 'AddRelacion1674658709739';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "items" ADD "user_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "items" ADD CONSTRAINT "FK_3b934e62fb52bac909e0ddf5422" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "items" DROP CONSTRAINT "FK_3b934e62fb52bac909e0ddf5422"`,
    );
    await queryRunner.query(`ALTER TABLE "items" DROP COLUMN "user_id"`);
  }
}
