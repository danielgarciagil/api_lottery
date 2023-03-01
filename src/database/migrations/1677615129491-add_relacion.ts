import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelacion1677615129491 implements MigrationInterface {
  name = 'addRelacion1677615129491';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" ADD "id_sorteo" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" ADD CONSTRAINT "UQ_cc9f45b395034f5ca614f12a449" UNIQUE ("id_sorteo")`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" ADD CONSTRAINT "FK_cc9f45b395034f5ca614f12a449" FOREIGN KEY ("id_sorteo") REFERENCES "SORTEO"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" DROP CONSTRAINT "FK_cc9f45b395034f5ca614f12a449"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" DROP CONSTRAINT "UQ_cc9f45b395034f5ca614f12a449"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" DROP COLUMN "id_sorteo"`,
    );
  }
}
