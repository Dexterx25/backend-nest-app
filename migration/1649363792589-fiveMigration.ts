import {MigrationInterface, QueryRunner} from "typeorm";

export class fiveMigration1649363792589 implements MigrationInterface {
    name = 'fiveMigration1649363792589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nextto_roomsMembers" DROP CONSTRAINT "FK_3d8987298f985680e25ff28566b"`);
        await queryRunner.query(`ALTER TABLE "nextto_roomsMembers" RENAME COLUMN "userIdId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "nextto_roomsMembers" RENAME CONSTRAINT "REL_3d8987298f985680e25ff28566" TO "UQ_080f141c2848a8263c3611b7bf7"`);
        await queryRunner.query(`ALTER TABLE "nextto_roomsMembers" ADD CONSTRAINT "FK_080f141c2848a8263c3611b7bf7" FOREIGN KEY ("userId") REFERENCES "nextto_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nextto_roomsMembers" DROP CONSTRAINT "FK_080f141c2848a8263c3611b7bf7"`);
        await queryRunner.query(`ALTER TABLE "nextto_roomsMembers" RENAME CONSTRAINT "UQ_080f141c2848a8263c3611b7bf7" TO "REL_3d8987298f985680e25ff28566"`);
        await queryRunner.query(`ALTER TABLE "nextto_roomsMembers" RENAME COLUMN "userId" TO "userIdId"`);
        await queryRunner.query(`ALTER TABLE "nextto_roomsMembers" ADD CONSTRAINT "FK_3d8987298f985680e25ff28566b" FOREIGN KEY ("userIdId") REFERENCES "nextto_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
