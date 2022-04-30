import {MigrationInterface, QueryRunner} from "typeorm";

export class vamo21649423414522 implements MigrationInterface {
    name = 'vamo21649423414522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nextto_users" ADD "full_name" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nextto_users" ADD "nikename" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nextto_users" ADD "names" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nextto_users" ADD "lastnames" character varying(200) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nextto_users" DROP COLUMN "lastnames"`);
        await queryRunner.query(`ALTER TABLE "nextto_users" DROP COLUMN "names"`);
        await queryRunner.query(`ALTER TABLE "nextto_users" DROP COLUMN "nikename"`);
        await queryRunner.query(`ALTER TABLE "nextto_users" DROP COLUMN "full_name"`);
    }

}
