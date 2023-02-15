import { MigrationInterface, QueryRunner } from 'typeorm';

export class nullImg1676472283618 implements MigrationInterface {
  name = 'nullImg1676472283618';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "loteria" ALTER COLUMN "img_url" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sorteo" ALTER COLUMN "img_url" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sorteo" ALTER COLUMN "img_url" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "loteria" ALTER COLUMN "img_url" SET NOT NULL`,
    );
  }
}
