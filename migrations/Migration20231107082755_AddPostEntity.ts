import { Migration } from '@mikro-orm/migrations';

export class Migration20231107082755_AddPostEntity extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "posts" ("id" uuid not null, "title" varchar(255) not null, "content" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "author_id" uuid not null, constraint "posts_pkey" primary key ("id"));');

    this.addSql('alter table "posts" add constraint "posts_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "posts" cascade;');
  }

}
