import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEntityJuego1676384982262 implements MigrationInterface {
  name = 'addEntityJuego1676384982262';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "juego" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "abreviatura" character varying NOT NULL, "descripcion" character varying NOT NULL, "posiciones" integer NOT NULL, "rango_minimo" integer NOT NULL, "rango_maximo" integer NOT NULL, CONSTRAINT "PK_d0ac2f7932d13ee8976f473fe6f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "juego"`);
  }
}
