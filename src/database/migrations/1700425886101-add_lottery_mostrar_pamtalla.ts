import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLotteryMostrarPamtalla1700425886101
  implements MigrationInterface
{
  name = 'AddLotteryMostrarPamtalla1700425886101';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTERIA" ADD "mostrar_pantalla" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTERIA" DROP COLUMN "mostrar_pantalla"`,
    );
  }
}
