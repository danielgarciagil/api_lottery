import { MigrationInterface, QueryRunner } from 'typeorm';

export class nullTrueImg1677681438932 implements MigrationInterface {
  name = 'nullTrueImg1677681438932';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "PLATAFORMA" ALTER COLUMN "img_url" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "PLATAFORMA" ALTER COLUMN "img_url" SET NOT NULL`,
    );
  }
}
