import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColum1677772762099 implements MigrationInterface {
  name = 'addColum1677772762099';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" DROP COLUMN "data_lotenet_numero_posiicones"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" ADD "lotenet_numero_posiciones_premio" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" ADD "lotenet_numero_digitos_premio" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" DROP COLUMN "lotenet_numero_digitos_premio"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" DROP COLUMN "lotenet_numero_posiciones_premio"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" ADD "data_lotenet_numero_posiicones" integer NOT NULL`,
    );
  }
}
