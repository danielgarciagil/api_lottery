import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelacion1677679006669 implements MigrationInterface {
  name = 'addRelacion1677679006669';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" ADD "plataformaId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "premio_dias" ADD "lotenetPremioId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" ADD CONSTRAINT "FK_dfbf988dd3aec228430e556b1ad" FOREIGN KEY ("plataformaId") REFERENCES "PLATAFORMA"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "premio_dias" ADD CONSTRAINT "FK_24e47a2925c5c859dba16a631d0" FOREIGN KEY ("lotenetPremioId") REFERENCES "LOTENET_PREMIO"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "premio_dias" DROP CONSTRAINT "FK_24e47a2925c5c859dba16a631d0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" DROP CONSTRAINT "FK_dfbf988dd3aec228430e556b1ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "premio_dias" DROP COLUMN "lotenetPremioId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" DROP COLUMN "plataformaId"`,
    );
  }
}
