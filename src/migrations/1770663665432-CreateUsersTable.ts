import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1770663665432 implements MigrationInterface {
    name = 'CreateUsersTable1770663665432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_like" ("likerId" integer NOT NULL, "postId" integer NOT NULL, PRIMARY KEY ("likerId", "postId"))`);
        await queryRunner.query(`INSERT INTO "temporary_like"("likerId", "postId") SELECT "likerId", "postId" FROM "like"`);
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`ALTER TABLE "temporary_like" RENAME TO "like"`);
        await queryRunner.query(`CREATE TABLE "temporary_hash_tag" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar NOT NULL, "postId" integer, CONSTRAINT "FK_ee1b18a66407ca649080dd18de8" FOREIGN KEY ("postId") REFERENCES "posts" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_hash_tag"("id", "value", "postId") SELECT "id", "value", "postId" FROM "hash_tag"`);
        await queryRunner.query(`DROP TABLE "hash_tag"`);
        await queryRunner.query(`ALTER TABLE "temporary_hash_tag" RENAME TO "hash_tag"`);
        await queryRunner.query(`CREATE TABLE "activity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer NOT NULL, "activityType" varchar NOT NULL, "activityData" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_follow" ("followerId" integer NOT NULL, "followingId" integer NOT NULL, "followedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_550dce89df9570f251b6af2665a" FOREIGN KEY ("followerId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_e9f68503556c5d72a161ce38513" FOREIGN KEY ("followingId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("followerId", "followingId"))`);
        await queryRunner.query(`INSERT INTO "temporary_follow"("followerId", "followingId") SELECT "followerId", "followingId" FROM "follow"`);
        await queryRunner.query(`DROP TABLE "follow"`);
        await queryRunner.query(`ALTER TABLE "temporary_follow" RENAME TO "follow"`);
        await queryRunner.query(`CREATE TABLE "temporary_hash_tag" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar NOT NULL, "postId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_hash_tag"("id", "value", "postId") SELECT "id", "value", "postId" FROM "hash_tag"`);
        await queryRunner.query(`DROP TABLE "hash_tag"`);
        await queryRunner.query(`ALTER TABLE "temporary_hash_tag" RENAME TO "hash_tag"`);
        await queryRunner.query(`CREATE TABLE "temporary_hash_tag" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar NOT NULL, "postId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_hash_tag"("id", "value", "postId") SELECT "id", "value", "postId" FROM "hash_tag"`);
        await queryRunner.query(`DROP TABLE "hash_tag"`);
        await queryRunner.query(`ALTER TABLE "temporary_hash_tag" RENAME TO "hash_tag"`);
        await queryRunner.query(`CREATE TABLE "temporary_hash_tag" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar NOT NULL, "postId" integer NOT NULL, CONSTRAINT "FK_ee1b18a66407ca649080dd18de8" FOREIGN KEY ("postId") REFERENCES "posts" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_hash_tag"("id", "value", "postId") SELECT "id", "value", "postId" FROM "hash_tag"`);
        await queryRunner.query(`DROP TABLE "hash_tag"`);
        await queryRunner.query(`ALTER TABLE "temporary_hash_tag" RENAME TO "hash_tag"`);
        await queryRunner.query(`CREATE TABLE "temporary_like" ("likerId" integer NOT NULL, "postId" integer NOT NULL, CONSTRAINT "FK_4f8a27c5436803c6376a2d4fce7" FOREIGN KEY ("likerId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_3acf7c55c319c4000e8056c1279" FOREIGN KEY ("postId") REFERENCES "posts" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("likerId", "postId"))`);
        await queryRunner.query(`INSERT INTO "temporary_like"("likerId", "postId") SELECT "likerId", "postId" FROM "like"`);
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`ALTER TABLE "temporary_like" RENAME TO "like"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" RENAME TO "temporary_like"`);
        await queryRunner.query(`CREATE TABLE "like" ("likerId" integer NOT NULL, "postId" integer NOT NULL, PRIMARY KEY ("likerId", "postId"))`);
        await queryRunner.query(`INSERT INTO "like"("likerId", "postId") SELECT "likerId", "postId" FROM "temporary_like"`);
        await queryRunner.query(`DROP TABLE "temporary_like"`);
        await queryRunner.query(`ALTER TABLE "hash_tag" RENAME TO "temporary_hash_tag"`);
        await queryRunner.query(`CREATE TABLE "hash_tag" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar NOT NULL, "postId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "hash_tag"("id", "value", "postId") SELECT "id", "value", "postId" FROM "temporary_hash_tag"`);
        await queryRunner.query(`DROP TABLE "temporary_hash_tag"`);
        await queryRunner.query(`ALTER TABLE "hash_tag" RENAME TO "temporary_hash_tag"`);
        await queryRunner.query(`CREATE TABLE "hash_tag" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar NOT NULL, "postId" integer)`);
        await queryRunner.query(`INSERT INTO "hash_tag"("id", "value", "postId") SELECT "id", "value", "postId" FROM "temporary_hash_tag"`);
        await queryRunner.query(`DROP TABLE "temporary_hash_tag"`);
        await queryRunner.query(`ALTER TABLE "hash_tag" RENAME TO "temporary_hash_tag"`);
        await queryRunner.query(`CREATE TABLE "hash_tag" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar NOT NULL, "postId" integer, CONSTRAINT "FK_ee1b18a66407ca649080dd18de8" FOREIGN KEY ("postId") REFERENCES "posts" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "hash_tag"("id", "value", "postId") SELECT "id", "value", "postId" FROM "temporary_hash_tag"`);
        await queryRunner.query(`DROP TABLE "temporary_hash_tag"`);
        await queryRunner.query(`ALTER TABLE "follow" RENAME TO "temporary_follow"`);
        await queryRunner.query(`CREATE TABLE "follow" ("followerId" integer NOT NULL, "followingId" integer NOT NULL, CONSTRAINT "FK_550dce89df9570f251b6af2665a" FOREIGN KEY ("followerId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_e9f68503556c5d72a161ce38513" FOREIGN KEY ("followingId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("followerId", "followingId"))`);
        await queryRunner.query(`INSERT INTO "follow"("followerId", "followingId") SELECT "followerId", "followingId" FROM "temporary_follow"`);
        await queryRunner.query(`DROP TABLE "temporary_follow"`);
        await queryRunner.query(`DROP TABLE "activity"`);
        await queryRunner.query(`ALTER TABLE "hash_tag" RENAME TO "temporary_hash_tag"`);
        await queryRunner.query(`CREATE TABLE "hash_tag" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar NOT NULL, "postId" integer, CONSTRAINT "FK_ee1b18a66407ca649080dd18de8" FOREIGN KEY ("postId") REFERENCES "posts" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "hash_tag"("id", "value", "postId") SELECT "id", "value", "postId" FROM "temporary_hash_tag"`);
        await queryRunner.query(`DROP TABLE "temporary_hash_tag"`);
        await queryRunner.query(`ALTER TABLE "like" RENAME TO "temporary_like"`);
        await queryRunner.query(`CREATE TABLE "like" ("likerId" integer NOT NULL, "postId" integer NOT NULL, CONSTRAINT "FK_4f8a27c5436803c6376a2d4fce7" FOREIGN KEY ("likerId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3acf7c55c319c4000e8056c1279" FOREIGN KEY ("postId") REFERENCES "posts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("likerId", "postId"))`);
        await queryRunner.query(`INSERT INTO "like"("likerId", "postId") SELECT "likerId", "postId" FROM "temporary_like"`);
        await queryRunner.query(`DROP TABLE "temporary_like"`);
    }

}
