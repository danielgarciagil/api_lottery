import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelacionUserRole1676317331500 implements MigrationInterface {
  name = 'addRelacionUserRole1676317331500';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "usuario_role" ("roleId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_4aeda16e0387697a21fd57d3034" PRIMARY KEY ("roleId", "usersId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2a7f3507a5cd06f988b0467478" ON "usuario_role" ("roleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c83e2917efc54e4d5145d452db" ON "usuario_role" ("usersId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_role" ADD CONSTRAINT "FK_2a7f3507a5cd06f988b0467478c" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_role" ADD CONSTRAINT "FK_c83e2917efc54e4d5145d452db5" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "usuario_role" DROP CONSTRAINT "FK_c83e2917efc54e4d5145d452db5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_role" DROP CONSTRAINT "FK_2a7f3507a5cd06f988b0467478c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c83e2917efc54e4d5145d452db"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2a7f3507a5cd06f988b0467478"`,
    );
    await queryRunner.query(`DROP TABLE "usuario_role"`);
  }
}
