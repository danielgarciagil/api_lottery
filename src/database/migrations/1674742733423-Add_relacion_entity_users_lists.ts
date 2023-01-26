import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRelacionEntityUsersLists1674742733423 implements MigrationInterface {
    name = 'AddRelacionEntityUsersLists1674742733423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lists" ADD "user_id" uuid`);
        await queryRunner.query(`CREATE INDEX "user_id_index_lists" ON "lists" ("user_id") `);
        await queryRunner.query(`ALTER TABLE "lists" ADD CONSTRAINT "FK_f01581ed98cd99b38495bcdd16b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "lists" DROP CONSTRAINT "FK_f01581ed98cd99b38495bcdd16b"`);
        await queryRunner.query(`DROP INDEX "public"."user_id_index_lists"`);
        await queryRunner.query(`ALTER TABLE "lists" DROP COLUMN "user_id"`);
    }

}
