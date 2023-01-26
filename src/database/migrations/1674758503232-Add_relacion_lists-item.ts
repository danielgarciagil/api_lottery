import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelacionListsItem1674758503232 implements MigrationInterface {
  name = 'AddRelacionListsItem1674758503232';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "list_items" ADD "list_id" uuid`);
    await queryRunner.query(`ALTER TABLE "list_items" ADD "item_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "list_items" ADD CONSTRAINT "FK_8bf07909d6d9e95e8e637bd5b3e" FOREIGN KEY ("list_id") REFERENCES "lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "list_items" ADD CONSTRAINT "FK_ac3b5466a5f2799771ca190c09f" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "list_items" DROP CONSTRAINT "FK_ac3b5466a5f2799771ca190c09f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "list_items" DROP CONSTRAINT "FK_8bf07909d6d9e95e8e637bd5b3e"`,
    );
    await queryRunner.query(`ALTER TABLE "list_items" DROP COLUMN "item_id"`);
    await queryRunner.query(`ALTER TABLE "list_items" DROP COLUMN "list_id"`);
  }
}
