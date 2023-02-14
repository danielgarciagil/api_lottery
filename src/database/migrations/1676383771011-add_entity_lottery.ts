import { MigrationInterface, QueryRunner } from "typeorm";

export class addEntityLottery1676383771011 implements MigrationInterface {
    name = 'addEntityLottery1676383771011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "loteria" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "abreviatura" character varying NOT NULL, "img_url" character varying NOT NULL, "descripcion" character varying NOT NULL, "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_c1c7c728666c54fa223f31aff55" UNIQUE ("name"), CONSTRAINT "UQ_10fe1610bd383608a3c01d20d63" UNIQUE ("abreviatura"), CONSTRAINT "PK_e8d2732119d5d0899bc94221024" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "loteria"`);
    }

}
