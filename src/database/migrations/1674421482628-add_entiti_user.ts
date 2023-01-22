import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEntitiUser1674421482628 implements MigrationInterface {
  name = 'addEntitiUser1674421482628';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "items" ALTER COLUMN "quantity_units" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "items" ALTER COLUMN "quantity_units" SET NOT NULL`,
    );
  }
}
