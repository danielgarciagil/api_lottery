import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColum1677768856011 implements MigrationInterface {
  name = 'addColum1677768856011';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" ADD "data_lotenet_numero_posiicones" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" DROP COLUMN "data_lotenet_numero_posiicones"`,
    );
  }
}
