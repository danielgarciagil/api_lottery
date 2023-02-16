import { MigrationInterface, QueryRunner } from "typeorm";

export class addRelacionnn1676562244827 implements MigrationInterface {
    name = 'addRelacionnn1676562244827'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "xpath" ADD "id_sorteo_a_buscar" integer`);
        await queryRunner.query(`ALTER TABLE "xpath" ADD CONSTRAINT "FK_dc0531dce457b0fd65743fcb64f" FOREIGN KEY ("id_sorteo_a_buscar") REFERENCES "so_a_bu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "xpath" DROP CONSTRAINT "FK_dc0531dce457b0fd65743fcb64f"`);
        await queryRunner.query(`ALTER TABLE "xpath" DROP COLUMN "id_sorteo_a_buscar"`);
    }

}
