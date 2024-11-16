import { MigrationInterface, QueryRunner } from "typeorm";

export class ArticleMigration1731761880700 implements MigrationInterface {
    name = 'ArticleMigration1731761880700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "content" character varying NOT NULL, "phone" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "article_id" integer NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "image" character varying NOT NULL, "content" character varying NOT NULL, "view_count" integer NOT NULL, "slug" character varying NOT NULL, "status" character varying NOT NULL, "is_breaking" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1123ff6815c5b8fec0ba9fec370" UNIQUE ("slug"), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'admin'`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e9b498cca509147e73808f9e593" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e9b498cca509147e73808f9e593"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT false`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
