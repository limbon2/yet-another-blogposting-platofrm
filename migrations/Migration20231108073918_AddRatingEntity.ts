import { Migration } from '@mikro-orm/migrations';

export class Migration20231108073918_AddRatingEntity extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "ratings" ("id" uuid not null, "value" int not null, "target_id" uuid not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "rater_id" uuid not null, constraint "ratings_pkey" primary key ("id"));');

    this.addSql('alter table "ratings" add constraint "ratings_rater_id_foreign" foreign key ("rater_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "posts" add column "rating" bigint not null default 0;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "ratings" cascade;');

    this.addSql('alter table "posts" drop column "rating";');
  }

}
