import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEntityLists1674742497395 implements MigrationInterface {
  name = 'AddEntityLists1674742497395';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "lists" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_268b525e9a6dd04d0685cb2aaaa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "user_id_index" ON "items" ("user_id") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."user_id_index"`);
    await queryRunner.query(`DROP TABLE "lists"`);
  }
}
