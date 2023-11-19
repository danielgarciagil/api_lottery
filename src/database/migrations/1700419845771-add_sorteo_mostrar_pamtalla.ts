import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSorteoMostrarPamtalla1700419845771
  implements MigrationInterface
{
  name = 'AddSorteoMostrarPamtalla1700419845771';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "SORTEO" ADD "mostrar_pantalla" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "SORTEO" DROP COLUMN "mostrar_pantalla"`,
    );
  }
}
