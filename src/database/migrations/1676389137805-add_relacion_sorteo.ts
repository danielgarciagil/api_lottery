import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelacionSorteo1676389137805 implements MigrationInterface {
  name = 'addRelacionSorteo1676389137805';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sorteo" ADD "id_juego" integer`);
    await queryRunner.query(`ALTER TABLE "sorteo" ADD "id_dia_semana" integer`);
    await queryRunner.query(
      `ALTER TABLE "sorteo" ADD CONSTRAINT "FK_f0e03db0cbf1f2abcb0e426e334" FOREIGN KEY ("id_juego") REFERENCES "juego"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sorteo" ADD CONSTRAINT "FK_895b7d489d374cf014d92d94a2f" FOREIGN KEY ("id_dia_semana") REFERENCES "dias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sorteo" DROP CONSTRAINT "FK_895b7d489d374cf014d92d94a2f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sorteo" DROP CONSTRAINT "FK_f0e03db0cbf1f2abcb0e426e334"`,
    );
    await queryRunner.query(`ALTER TABLE "sorteo" DROP COLUMN "id_dia_semana"`);
    await queryRunner.query(`ALTER TABLE "sorteo" DROP COLUMN "id_juego"`);
  }
}
