import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756164813620 implements MigrationInterface {
    name = 'InitialMigration1756164813620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "games" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "cover" character varying, "suggestion" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "campaigns" ("id" SERIAL NOT NULL, "month" character varying NOT NULL, "year" character varying NOT NULL, "current" boolean NOT NULL DEFAULT false, "description" character varying, "game_id" integer, CONSTRAINT "PK_831e3fcd4fc45b4e4c3f57a9ee4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "campaign_players" ("id" SERIAL NOT NULL, "played_the_game" boolean NOT NULL DEFAULT false, "finished_the_game" boolean NOT NULL DEFAULT false, "partook_in_the_meeting" boolean NOT NULL DEFAULT false, "suggested_a_game" boolean NOT NULL DEFAULT false, "campaign_id" integer, "player_id" integer, CONSTRAINT "UQ_55a1032bbaf44fe42206c8f67f5" UNIQUE ("campaign_id", "player_id"), CONSTRAINT "PK_d3f99be3ccd39831826321737b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "players" ("id" SERIAL NOT NULL, "email" character varying, "name" character varying, "discordId" character varying, "username" character varying, "global_name" character varying, "avatar" character varying, CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`ALTER TABLE "campaigns" ADD CONSTRAINT "FK_53115f9f31d365e063c69e3eaf4" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "campaign_players" ADD CONSTRAINT "FK_fa76630f81b4e32093465ecfb0c" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "campaign_players" ADD CONSTRAINT "FK_a3e83d6a06d463bbabe793c34f4" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "campaign_players" DROP CONSTRAINT "FK_a3e83d6a06d463bbabe793c34f4"`);
        await queryRunner.query(`ALTER TABLE "campaign_players" DROP CONSTRAINT "FK_fa76630f81b4e32093465ecfb0c"`);
        await queryRunner.query(`ALTER TABLE "campaigns" DROP CONSTRAINT "FK_53115f9f31d365e063c69e3eaf4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "players"`);
        await queryRunner.query(`DROP TABLE "campaign_players"`);
        await queryRunner.query(`DROP TABLE "campaigns"`);
        await queryRunner.query(`DROP TABLE "games"`);
    }

}
