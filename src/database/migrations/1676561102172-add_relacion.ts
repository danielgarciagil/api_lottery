import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelacion1676561102172 implements MigrationInterface {
  name = 'addRelacion1676561102172';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "so_a_bu" ADD "id_sorteo" integer`);
    await queryRunner.query(
      `ALTER TABLE "so_a_bu" ADD CONSTRAINT "UQ_19f6e54e4522322884d0ace7a75" UNIQUE ("id_sorteo")`,
    );
    await queryRunner.query(
      `ALTER TABLE "so_a_bu" ADD CONSTRAINT "FK_19f6e54e4522322884d0ace7a75" FOREIGN KEY ("id_sorteo") REFERENCES "sorteo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "so_a_bu" DROP CONSTRAINT "FK_19f6e54e4522322884d0ace7a75"`,
    );
    await queryRunner.query(
      `ALTER TABLE "so_a_bu" DROP CONSTRAINT "UQ_19f6e54e4522322884d0ace7a75"`,
    );
    await queryRunner.query(`ALTER TABLE "so_a_bu" DROP COLUMN "id_sorteo"`);
  }
}
