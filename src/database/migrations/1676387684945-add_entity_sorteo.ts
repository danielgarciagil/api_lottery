import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEntitySorteo1676387684945 implements MigrationInterface {
  name = 'addEntitySorteo1676387684945';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sorteo" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "abreviatura" character varying NOT NULL, "img_url" character varying NOT NULL, "descripcion" character varying NOT NULL, "hora" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_bceabbfbd982f671b4bce79960b" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sorteo"`);
  }
}
