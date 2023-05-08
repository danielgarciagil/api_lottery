import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelacionLotenetApi1683577906484 implements MigrationInterface {
  name = 'AddRelacionLotenetApi1683577906484';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTENET_API" ADD "id_sorteo" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_API" ADD CONSTRAINT "UQ_ed995e5418159852aab85723302" UNIQUE ("id_sorteo")`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_API" ADD CONSTRAINT "FK_ed995e5418159852aab85723302" FOREIGN KEY ("id_sorteo") REFERENCES "SORTEO"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "LOTENET_API" DROP CONSTRAINT "FK_ed995e5418159852aab85723302"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_API" DROP CONSTRAINT "UQ_ed995e5418159852aab85723302"`,
    );
    await queryRunner.query(
      `ALTER TABLE "LOTENET_API" DROP COLUMN "id_sorteo"`,
    );
  }
}
