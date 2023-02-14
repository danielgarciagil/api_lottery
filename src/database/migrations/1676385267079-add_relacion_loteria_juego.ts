import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelacionLoteriaJuego1676385267079
  implements MigrationInterface
{
  name = 'addRelacionLoteriaJuego1676385267079';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "juego" ADD "id_loteria" integer`);
    await queryRunner.query(
      `ALTER TABLE "juego" ADD CONSTRAINT "FK_503eb33c440f5ccd25f845ad045" FOREIGN KEY ("id_loteria") REFERENCES "loteria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "juego" DROP CONSTRAINT "FK_503eb33c440f5ccd25f845ad045"`,
    );
    await queryRunner.query(`ALTER TABLE "juego" DROP COLUMN "id_loteria"`);
  }
}
