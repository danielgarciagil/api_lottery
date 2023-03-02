import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumn1677785007686 implements MigrationInterface {
  name = 'addColumn1677785007686';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" ADD "numeros_intentos" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" ADD "tiempo_de_espera_segundos" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" DROP COLUMN "tiempo_de_espera_segundos"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" DROP COLUMN "numeros_intentos"`,
    );
  }
}
