import { MigrationInterface, QueryRunner } from 'typeorm';

export class editEntity1676328638663 implements MigrationInterface {
  name = 'editEntity1676328638663';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permiso_accion" RENAME COLUMN "name" TO "action"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permiso_accion" RENAME CONSTRAINT "UQ_89609d36a856790dc2d5992893e" TO "UQ_b4d8b89e91d1037d923fcf9b3ca"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "token" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "token" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "permiso_accion" RENAME CONSTRAINT "UQ_b4d8b89e91d1037d923fcf9b3ca" TO "UQ_89609d36a856790dc2d5992893e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permiso_accion" RENAME COLUMN "action" TO "name"`,
    );
  }
}
