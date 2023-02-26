import { MigrationInterface, QueryRunner } from 'typeorm';

export class first1677367064705 implements MigrationInterface {
  name = 'first1677367064705';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "RESULTADO" ("id" SERIAL NOT NULL, "numeros_ganadores" integer array NOT NULL, "fecha" TIMESTAMP WITH TIME ZONE NOT NULL, "activo" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id_sorteo" integer, CONSTRAINT "PK_a454545367dc8666b4eb8ceaac0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "LOTERIA" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "abreviatura" character varying NOT NULL, "img_url" character varying, "descripcion" character varying NOT NULL, "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_59f320fe61626dbf974da626e26" UNIQUE ("name"), CONSTRAINT "UQ_357d0d53d6d090df61cf82db91a" UNIQUE ("abreviatura"), CONSTRAINT "PK_5e3e4e40d27ceaa119fb65179f1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "XPATH" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "descripcion" character varying NOT NULL, "activo" boolean NOT NULL DEFAULT true, "xpath_digitos" character varying array NOT NULL, "xpath_urls_by_digitos" character varying array NOT NULL, "xpath_fecha_by_digitos" character varying array NOT NULL, "id_sorteo_a_buscar" integer, CONSTRAINT "PK_9310abfb9ee378a489ace7dcb42" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "res_sor_bus" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "completed" boolean NOT NULL DEFAULT false, "is_error" boolean NOT NULL DEFAULT false, "activo" boolean NOT NULL DEFAULT true, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id_sorteo_a_bsucar" integer, CONSTRAINT "PK_a1c3e1e09f3a6e24b1048a4627c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "so_a_bu" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "activo" boolean NOT NULL DEFAULT true, "numeros_intentos" integer NOT NULL, "tiempo_de_espera_segundos" integer NOT NULL, "id_sorteo" integer, CONSTRAINT "REL_19f6e54e4522322884d0ace7a7" UNIQUE ("id_sorteo"), CONSTRAINT "PK_25912bebcc77fa395fc9d2e6f9f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."DIA_name_enum" AS ENUM('DOMINGO', 'LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO')`,
    );
    await queryRunner.query(
      `CREATE TABLE "DIA" ("id" SERIAL NOT NULL, "name" "public"."DIA_name_enum" NOT NULL, CONSTRAINT "UQ_80cf8d3b38966d3646b684629da" UNIQUE ("name"), CONSTRAINT "PK_67fc752f5cd47f8cc7c87c7cf88" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sorteo_dias" ("id" SERIAL NOT NULL, "hora" TIME NOT NULL, " id_sorteo" integer, "id_dias" integer, CONSTRAINT "PK_6416fdf1b1696f6990f6156dbe5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "SORTEO" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "abreviatura" character varying NOT NULL, "img_url" character varying, "descripcion" character varying NOT NULL, "activo" boolean NOT NULL DEFAULT true, "id_juego" integer, "id_loteria" integer, CONSTRAINT "PK_e40666a1195be477d4b85cadbdf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "JUEGO" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "abreviatura" character varying NOT NULL, "descripcion" character varying NOT NULL, "posiciones" integer NOT NULL, "rango_minimo" integer NOT NULL, "rango_maximo" integer NOT NULL, "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_fec785628b9b70736e088a16e8b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "USER" ("id" SERIAL NOT NULL, "nickname" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "token" character varying, "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_27f756176db21990fa6e01cd3e4" UNIQUE ("nickname"), CONSTRAINT "UQ_c090db0477be7a25259805e37c2" UNIQUE ("email"), CONSTRAINT "PK_480564dbef3c7391661ce3b9d5c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ROLE" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "descripcion" character varying NOT NULL, "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_80ff1517ccd95294fd8c7631b93" UNIQUE ("name"), CONSTRAINT "PK_e741bff98568f2f915d401722d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "permiso_accion" ("id" SERIAL NOT NULL, "action" character varying NOT NULL, "method" character varying NOT NULL, "entity" character varying NOT NULL, "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_b4d8b89e91d1037d923fcf9b3ca" UNIQUE ("action"), CONSTRAINT "PK_da51b1302253e1c93caf85bfc69" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "usuario_role" ("rOLEId" integer NOT NULL, "uSERId" integer NOT NULL, CONSTRAINT "PK_e9231a0dcf554bcfbc77dfad4f7" PRIMARY KEY ("rOLEId", "uSERId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5ee7735e1d8e27eb292dae7eea" ON "usuario_role" ("rOLEId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_01b5a4232f18641ecd38f7d239" ON "usuario_role" ("uSERId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "rol_pe_ac" ("permisoAccionId" integer NOT NULL, "rOLEId" integer NOT NULL, CONSTRAINT "PK_41b30a268a528037ecb860dc0e3" PRIMARY KEY ("permisoAccionId", "rOLEId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3f49c5ed5c4a9127d76460b449" ON "rol_pe_ac" ("permisoAccionId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c59e639fd2b3ffea7d18e27598" ON "rol_pe_ac" ("rOLEId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "RESULTADO" ADD CONSTRAINT "FK_d324c497327d4d8d55c5aaf7619" FOREIGN KEY ("id_sorteo") REFERENCES "SORTEO"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "XPATH" ADD CONSTRAINT "FK_09c594f81977691ec98764aff0a" FOREIGN KEY ("id_sorteo_a_buscar") REFERENCES "so_a_bu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "res_sor_bus" ADD CONSTRAINT "FK_4056c12598052bde449b9741077" FOREIGN KEY ("id_sorteo_a_bsucar") REFERENCES "so_a_bu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "so_a_bu" ADD CONSTRAINT "FK_19f6e54e4522322884d0ace7a75" FOREIGN KEY ("id_sorteo") REFERENCES "SORTEO"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sorteo_dias" ADD CONSTRAINT "FK_ba5da2e112546f3f1bcb87a2308" FOREIGN KEY (" id_sorteo") REFERENCES "SORTEO"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sorteo_dias" ADD CONSTRAINT "FK_03ff16940a7b6b996c68751dbb6" FOREIGN KEY ("id_dias") REFERENCES "DIA"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "SORTEO" ADD CONSTRAINT "FK_117f50b7be10b637dcd6346bcdf" FOREIGN KEY ("id_juego") REFERENCES "JUEGO"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "SORTEO" ADD CONSTRAINT "FK_a1e2d30a4868300eef9a921bb95" FOREIGN KEY ("id_loteria") REFERENCES "LOTERIA"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_role" ADD CONSTRAINT "FK_5ee7735e1d8e27eb292dae7eea5" FOREIGN KEY ("rOLEId") REFERENCES "ROLE"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_role" ADD CONSTRAINT "FK_01b5a4232f18641ecd38f7d239b" FOREIGN KEY ("uSERId") REFERENCES "USER"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "rol_pe_ac" ADD CONSTRAINT "FK_3f49c5ed5c4a9127d76460b4496" FOREIGN KEY ("permisoAccionId") REFERENCES "permiso_accion"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "rol_pe_ac" ADD CONSTRAINT "FK_c59e639fd2b3ffea7d18e27598d" FOREIGN KEY ("rOLEId") REFERENCES "ROLE"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rol_pe_ac" DROP CONSTRAINT "FK_c59e639fd2b3ffea7d18e27598d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "rol_pe_ac" DROP CONSTRAINT "FK_3f49c5ed5c4a9127d76460b4496"`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_role" DROP CONSTRAINT "FK_01b5a4232f18641ecd38f7d239b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_role" DROP CONSTRAINT "FK_5ee7735e1d8e27eb292dae7eea5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "SORTEO" DROP CONSTRAINT "FK_a1e2d30a4868300eef9a921bb95"`,
    );
    await queryRunner.query(
      `ALTER TABLE "SORTEO" DROP CONSTRAINT "FK_117f50b7be10b637dcd6346bcdf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sorteo_dias" DROP CONSTRAINT "FK_03ff16940a7b6b996c68751dbb6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sorteo_dias" DROP CONSTRAINT "FK_ba5da2e112546f3f1bcb87a2308"`,
    );
    await queryRunner.query(
      `ALTER TABLE "so_a_bu" DROP CONSTRAINT "FK_19f6e54e4522322884d0ace7a75"`,
    );
    await queryRunner.query(
      `ALTER TABLE "res_sor_bus" DROP CONSTRAINT "FK_4056c12598052bde449b9741077"`,
    );
    await queryRunner.query(
      `ALTER TABLE "XPATH" DROP CONSTRAINT "FK_09c594f81977691ec98764aff0a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "RESULTADO" DROP CONSTRAINT "FK_d324c497327d4d8d55c5aaf7619"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c59e639fd2b3ffea7d18e27598"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3f49c5ed5c4a9127d76460b449"`,
    );
    await queryRunner.query(`DROP TABLE "rol_pe_ac"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_01b5a4232f18641ecd38f7d239"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5ee7735e1d8e27eb292dae7eea"`,
    );
    await queryRunner.query(`DROP TABLE "usuario_role"`);
    await queryRunner.query(`DROP TABLE "permiso_accion"`);
    await queryRunner.query(`DROP TABLE "ROLE"`);
    await queryRunner.query(`DROP TABLE "USER"`);
    await queryRunner.query(`DROP TABLE "JUEGO"`);
    await queryRunner.query(`DROP TABLE "SORTEO"`);
    await queryRunner.query(`DROP TABLE "sorteo_dias"`);
    await queryRunner.query(`DROP TABLE "DIA"`);
    await queryRunner.query(`DROP TYPE "public"."DIA_name_enum"`);
    await queryRunner.query(`DROP TABLE "so_a_bu"`);
    await queryRunner.query(`DROP TABLE "res_sor_bus"`);
    await queryRunner.query(`DROP TABLE "XPATH"`);
    await queryRunner.query(`DROP TABLE "LOTERIA"`);
    await queryRunner.query(`DROP TABLE "RESULTADO"`);
  }
}
