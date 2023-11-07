import { Migration } from '@mikro-orm/migrations';

export class Migration20231107124721_AddCommentEntity extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "comments" ("id" uuid not null, "content" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "author_id" uuid not null, "post_id" uuid not null, constraint "comments_pkey" primary key ("id"));');

    this.addSql('alter table "comments" add constraint "comments_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "comments" add constraint "comments_post_id_foreign" foreign key ("post_id") references "posts" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "comments" cascade;');
  }

}
