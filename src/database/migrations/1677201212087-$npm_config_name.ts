import { MigrationInterface, QueryRunner } from "typeorm";

export class $npmConfigName1677201212087 implements MigrationInterface {
    name = '$npmConfigName1677201212087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "res_sor_bus" ADD "id_sorteo_a_bsucar" integer`);
        await queryRunner.query(`ALTER TABLE "res_sor_bus" ADD CONSTRAINT "FK_4056c12598052bde449b9741077" FOREIGN KEY ("id_sorteo_a_bsucar") REFERENCES "so_a_bu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "res_sor_bus" DROP CONSTRAINT "FK_4056c12598052bde449b9741077"`);
        await queryRunner.query(`ALTER TABLE "res_sor_bus" DROP COLUMN "id_sorteo_a_bsucar"`);
    }

}
