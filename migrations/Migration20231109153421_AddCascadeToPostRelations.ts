import { Migration } from '@mikro-orm/migrations';

export class Migration20231109153421_AddCascadeToPostRelations extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "comments" drop constraint "comments_author_id_foreign";');
    this.addSql('alter table "comments" drop constraint "comments_post_id_foreign";');

    this.addSql('alter table "comments" add constraint "comments_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade on delete set null;');
    this.addSql('alter table "comments" add constraint "comments_post_id_foreign" foreign key ("post_id") references "posts" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "comments" drop constraint "comments_author_id_foreign";');
    this.addSql('alter table "comments" drop constraint "comments_post_id_foreign";');

    this.addSql('alter table "comments" add constraint "comments_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "comments" add constraint "comments_post_id_foreign" foreign key ("post_id") references "posts" ("id") on update cascade;');
  }

}
