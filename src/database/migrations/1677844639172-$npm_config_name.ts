import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1677844639172 implements MigrationInterface {
  name = '$npmConfigName1677844639172';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" DROP CONSTRAINT "FK_dfbf988dd3aec228430e556b1ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" RENAME COLUMN "plataformaId" TO "id_plataforma"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" ADD CONSTRAINT "FK_8d9a2380139ebcfec59074b491f" FOREIGN KEY ("id_plataforma") REFERENCES "PLATAFORMA"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" DROP CONSTRAINT "FK_8d9a2380139ebcfec59074b491f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" RENAME COLUMN "id_plataforma" TO "plataformaId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_PREMIO" ADD CONSTRAINT "FK_dfbf988dd3aec228430e556b1ad" FOREIGN KEY ("plataformaId") REFERENCES "PLATAFORMA"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
