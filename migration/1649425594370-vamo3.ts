import {MigrationInterface, QueryRunner} from "typeorm";

export class vamo31649425594370 implements MigrationInterface {
    name = 'vamo31649425594370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nextto_roomsMembers" DROP CONSTRAINT "FK_080f141c2848a8263c3611b7bf7"`);
        await queryRunner.query(`ALTER TABLE "nextto_roomsMembers" DROP CONSTRAINT "UQ_080f141c2848a8263c3611b7bf7"`);
        await queryRunner.query(`ALTER TABLE "nextto_roomsMembers" ADD CONSTRAINT "FK_080f141c2848a8263c3611b7bf7" FOREIGN KEY ("userId") REFERENCES "nextto_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nextto_roomsMembers" DROP CONSTRAINT "FK_080f141c2848a8263c3611b7bf7"`);
        await queryRunner.query(`ALTER TABLE "nextto_roomsMembers" ADD CONSTRAINT "UQ_080f141c2848a8263c3611b7bf7" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "nextto_roomsMembers" ADD CONSTRAINT "FK_080f141c2848a8263c3611b7bf7" FOREIGN KEY ("userId") REFERENCES "nextto_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
