import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumLastupdate1674585058549 implements MigrationInterface {
  name = 'AddColumLastupdate1674585058549';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "last_update_by_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_1e630fee56fa9a187579b7ea872" FOREIGN KEY ("last_update_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_1e630fee56fa9a187579b7ea872"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "last_update_by_id"`,
    );
  }
}
