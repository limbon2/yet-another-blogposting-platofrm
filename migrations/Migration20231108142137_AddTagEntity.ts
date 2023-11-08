import { Migration } from '@mikro-orm/migrations';

export class Migration20231108142137_AddTagEntity extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tags" ("id" uuid not null, "name" varchar(255) not null, "created_at" timestamptz(0) not null, constraint "tags_pkey" primary key ("id"));');

    this.addSql('create table "posts_tags" ("post_entity_id" uuid not null, "tag_entity_id" uuid not null, constraint "posts_tags_pkey" primary key ("post_entity_id", "tag_entity_id"));');

    this.addSql('alter table "posts_tags" add constraint "posts_tags_post_entity_id_foreign" foreign key ("post_entity_id") references "posts" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "posts_tags" add constraint "posts_tags_tag_entity_id_foreign" foreign key ("tag_entity_id") references "tags" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "posts_tags" drop constraint "posts_tags_tag_entity_id_foreign";');

    this.addSql('drop table if exists "tags" cascade;');

    this.addSql('drop table if exists "posts_tags" cascade;');
  }

}
