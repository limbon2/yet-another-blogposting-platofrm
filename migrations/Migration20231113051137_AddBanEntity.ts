import { Migration } from '@mikro-orm/migrations';

export class Migration20231113051137_AddBanEntity extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "bans" ("id" uuid not null, "reason" text not null, "target_id" uuid not null, "banned_by_id" uuid not null, "created_at" timestamptz(0) not null, constraint "bans_pkey" primary key ("id"));');

    this.addSql('alter table "bans" add constraint "bans_banned_by_id_foreign" foreign key ("banned_by_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "posts" add column "is_banned" boolean null default false;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "bans" cascade;');

    this.addSql('alter table "posts" drop column "is_banned";');
  }

}
