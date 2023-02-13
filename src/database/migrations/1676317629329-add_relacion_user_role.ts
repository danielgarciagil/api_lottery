import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelacionUserRole1676317629329 implements MigrationInterface {
  name = 'addRelacionUserRole1676317629329';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
      `DROP INDEX "public"."IDX_33c430838f94e5d62855b1bb92"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3f49c5ed5c4a9127d76460b449"`,
    );
    await queryRunner.query(`DROP TABLE "rol_pe_ac"`);
  }
}
