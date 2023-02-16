import { MigrationInterface, QueryRunner } from 'typeorm';

export class changeName1676563009503 implements MigrationInterface {
  name = 'changeName1676563009503';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "xpath" RENAME COLUMN "xpath_fecha_by_digito" TO "xpath_fecha_by_digitos"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "xpath" RENAME COLUMN "xpath_fecha_by_digitos" TO "xpath_fecha_by_digito"`,
    );
  }
}
