import { MigrationInterface, QueryRunner } from "typeorm";

export class addRelacion1677679276265 implements MigrationInterface {
    name = 'addRelacion1677679276265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "res_lot_pre" ADD "id_lotenet_premio" integer`);
        await queryRunner.query(`ALTER TABLE "res_lot_pre" ADD CONSTRAINT "FK_9f3fe67dfee667d0614b06395c9" FOREIGN KEY ("id_lotenet_premio") REFERENCES "LOTENET_PREMIO"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "res_lot_pre" DROP CONSTRAINT "FK_9f3fe67dfee667d0614b06395c9"`);
        await queryRunner.query(`ALTER TABLE "res_lot_pre" DROP COLUMN "id_lotenet_premio"`);
    }

}
