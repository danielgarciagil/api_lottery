import { MigrationInterface, QueryRunner } from 'typeorm';

export class Haiti1698933362495 implements MigrationInterface {
  name = 'Haiti1698933362495';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "LOTENET_HAITI_API" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "id_sorteo_pick3" integer NOT NULL, "id_sorteo_pick4" integer NOT NULL, CONSTRAINT "UQ_a83ad7f2f37c2cfff44a55e6453" UNIQUE ("name"), CONSTRAINT "PK_836370dc60ec249e4bc0e729f1c" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "LOTENET_HAITI_API"`);
  }
}
