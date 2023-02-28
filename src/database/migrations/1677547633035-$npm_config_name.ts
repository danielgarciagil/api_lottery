import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1677547633035 implements MigrationInterface {
  name = '$npmConfigName1677547633035';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "RESULTADO" ADD "id_user" integer`);
    await queryRunner.query(
      `ALTER TABLE "RESULTADO" ADD CONSTRAINT "FK_d515e571e26f45ea4c6b254a5f3" FOREIGN KEY ("id_user") REFERENCES "USER"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "RESULTADO" DROP CONSTRAINT "FK_d515e571e26f45ea4c6b254a5f3"`,
    );
    await queryRunner.query(`ALTER TABLE "RESULTADO" DROP COLUMN "id_user"`);
  }
}
