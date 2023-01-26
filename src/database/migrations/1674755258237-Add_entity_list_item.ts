import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEntityListItem1674755258237 implements MigrationInterface {
  name = 'AddEntityListItem1674755258237';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "list_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" numeric NOT NULL, "completed" boolean NOT NULL, CONSTRAINT "PK_26260957b2b71a1d8e2ecd005f8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "lists" DROP CONSTRAINT "FK_f01581ed98cd99b38495bcdd16b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lists" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "lists" ADD CONSTRAINT "FK_f01581ed98cd99b38495bcdd16b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "lists" DROP CONSTRAINT "FK_f01581ed98cd99b38495bcdd16b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "lists" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "lists" ADD CONSTRAINT "FK_f01581ed98cd99b38495bcdd16b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`DROP TABLE "list_items"`);
  }
}
