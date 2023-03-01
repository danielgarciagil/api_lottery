import { MigrationInterface, QueryRunner } from 'typeorm';

export class nullTrueImg1677687371751 implements MigrationInterface {
  name = 'nullTrueImg1677687371751';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" DROP COLUMN "lotenet_id_lottery"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" DROP COLUMN "lotenet_name_sorteo"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" ADD "data_lotenet_id_lottery" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" ADD "data_lotenet_name_sorteo" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" DROP COLUMN "data_lotenet_name_sorteo"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" DROP COLUMN "data_lotenet_id_lottery"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" ADD "lotenet_name_sorteo" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" ADD "lotenet_id_lottery" integer NOT NULL`,
    );
  }
}
