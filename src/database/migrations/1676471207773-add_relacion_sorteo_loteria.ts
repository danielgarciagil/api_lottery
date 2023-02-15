import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelacionSorteoLoteria1676471207773
  implements MigrationInterface
{
  name = 'addRelacionSorteoLoteria1676471207773';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sorteo" ADD "id_loteria" integer`);
    await queryRunner.query(
      `ALTER TABLE "sorteo" ADD CONSTRAINT "FK_6ca1d9c6a03bc92e1c3bd990960" FOREIGN KEY ("id_loteria") REFERENCES "loteria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sorteo" DROP CONSTRAINT "FK_6ca1d9c6a03bc92e1c3bd990960"`,
    );
    await queryRunner.query(`ALTER TABLE "sorteo" DROP COLUMN "id_loteria"`);
  }
}
