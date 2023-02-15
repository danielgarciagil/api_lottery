import { MigrationInterface, QueryRunner } from 'typeorm';

export class priemra1676470691048 implements MigrationInterface {
  name = 'priemra1676470691048';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "loteria" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "abreviatura" character varying NOT NULL, "img_url" character varying NOT NULL, "descripcion" character varying NOT NULL, "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_c1c7c728666c54fa223f31aff55" UNIQUE ("name"), CONSTRAINT "UQ_10fe1610bd383608a3c01d20d63" UNIQUE ("abreviatura"), CONSTRAINT "PK_e8d2732119d5d0899bc94221024" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "dias" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_f0b62bd212476c096bd8276997b" UNIQUE ("name"), CONSTRAINT "PK_c3ec07a9d7a384961b1446b72f6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "resultados" ("id" SERIAL NOT NULL, "numeros_ganadores" integer array NOT NULL, "fecha" TIMESTAMP WITH TIME ZONE NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id_sorteo" integer, CONSTRAINT "PK_b5c208f402f18d0ac82ae19b0d2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sorteo" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "abreviatura" character varying NOT NULL, "img_url" character varying NOT NULL, "descripcion" character varying NOT NULL, "hora" TIME NOT NULL, "id_juego" integer, "id_dia_semana" integer, CONSTRAINT "PK_bceabbfbd982f671b4bce79960b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "juego" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "abreviatura" character varying NOT NULL, "descripcion" character varying NOT NULL, "posiciones" integer NOT NULL, "rango_minimo" integer NOT NULL, "rango_maximo" integer NOT NULL, CONSTRAINT "PK_d0ac2f7932d13ee8976f473fe6f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "nickname" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "token" character varying, "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_ad02a1be8707004cb805a4b5023" UNIQUE ("nickname"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "descripcion" character varying NOT NULL, "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "permiso_accion" ("id" SERIAL NOT NULL, "action" character varying NOT NULL, "method" character varying NOT NULL, "entity" character varying NOT NULL, "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_b4d8b89e91d1037d923fcf9b3ca" UNIQUE ("action"), CONSTRAINT "PK_da51b1302253e1c93caf85bfc69" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "usuario_role" ("roleId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_4aeda16e0387697a21fd57d3034" PRIMARY KEY ("roleId", "usersId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2a7f3507a5cd06f988b0467478" ON "usuario_role" ("roleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c83e2917efc54e4d5145d452db" ON "usuario_role" ("usersId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "rol_pe_ac" ("permisoAccionId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_c1aa011e6d0cd7aa64fb5498f83" PRIMARY KEY ("permisoAccionId", "roleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3f49c5ed5c4a9127d76460b449" ON "rol_pe_ac" ("permisoAccionId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_33c430838f94e5d62855b1bb92" ON "rol_pe_ac" ("roleId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "resultados" ADD CONSTRAINT "FK_a4f41f4ceca155e213cd2338c79" FOREIGN KEY ("id_sorteo") REFERENCES "sorteo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sorteo" ADD CONSTRAINT "FK_f0e03db0cbf1f2abcb0e426e334" FOREIGN KEY ("id_juego") REFERENCES "juego"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sorteo" ADD CONSTRAINT "FK_895b7d489d374cf014d92d94a2f" FOREIGN KEY ("id_dia_semana") REFERENCES "dias"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_role" ADD CONSTRAINT "FK_2a7f3507a5cd06f988b0467478c" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_role" ADD CONSTRAINT "FK_c83e2917efc54e4d5145d452db5" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rol_pe_ac" ADD CONSTRAINT "FK_3f49c5ed5c4a9127d76460b4496" FOREIGN KEY ("permisoAccionId") REFERENCES "permiso_accion"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "rol_pe_ac" ADD CONSTRAINT "FK_33c430838f94e5d62855b1bb92a" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rol_pe_ac" DROP CONSTRAINT "FK_33c430838f94e5d62855b1bb92a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rol_pe_ac" DROP CONSTRAINT "FK_3f49c5ed5c4a9127d76460b4496"`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_role" DROP CONSTRAINT "FK_c83e2917efc54e4d5145d452db5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_role" DROP CONSTRAINT "FK_2a7f3507a5cd06f988b0467478c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sorteo" DROP CONSTRAINT "FK_895b7d489d374cf014d92d94a2f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sorteo" DROP CONSTRAINT "FK_f0e03db0cbf1f2abcb0e426e334"`,
    );
    await queryRunner.query(
      `ALTER TABLE "resultados" DROP CONSTRAINT "FK_a4f41f4ceca155e213cd2338c79"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_33c430838f94e5d62855b1bb92"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3f49c5ed5c4a9127d76460b449"`,
    );
    await queryRunner.query(`DROP TABLE "rol_pe_ac"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c83e2917efc54e4d5145d452db"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2a7f3507a5cd06f988b0467478"`,
    );
    await queryRunner.query(`DROP TABLE "usuario_role"`);
    await queryRunner.query(`DROP TABLE "permiso_accion"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "juego"`);
    await queryRunner.query(`DROP TABLE "sorteo"`);
    await queryRunner.query(`DROP TABLE "resultados"`);
    await queryRunner.query(`DROP TABLE "dias"`);
    await queryRunner.query(`DROP TABLE "loteria"`);
  }
}
