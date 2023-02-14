import { MigrationInterface, QueryRunner } from "typeorm";

export class addRelacionResultadosSorteo1676405361957 implements MigrationInterface {
    name = 'addRelacionResultadosSorteo1676405361957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resultados" ADD "id_sorteo" integer`);
        await queryRunner.query(`ALTER TABLE "resultados" ADD CONSTRAINT "FK_a4f41f4ceca155e213cd2338c79" FOREIGN KEY ("id_sorteo") REFERENCES "sorteo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resultados" DROP CONSTRAINT "FK_a4f41f4ceca155e213cd2338c79"`);
        await queryRunner.query(`ALTER TABLE "resultados" DROP COLUMN "id_sorteo"`);
    }

}
