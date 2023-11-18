import { Migration } from '@mikro-orm/migrations';

export class Migration20231118032618_ReplaceIdDataType extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "tags" alter column "id" type text using ("id"::text);');

    this.addSql('alter table "users" alter column "id" type text using ("id"::text);');

    this.addSql('alter table "reports" alter column "id" type text using ("id"::text);');
    this.addSql('alter table "reports" alter column "reporter_id" type text using ("reporter_id"::text);');

    this.addSql('alter table "ratings" alter column "id" type text using ("id"::text);');
    this.addSql('alter table "ratings" alter column "rater_id" type text using ("rater_id"::text);');

    this.addSql('alter table "followers" alter column "id" type text using ("id"::text);');
    this.addSql('alter table "followers" alter column "user_id" type text using ("user_id"::text);');
    this.addSql('alter table "followers" alter column "lead_id" type text using ("lead_id"::text);');

    this.addSql('alter table "communities" alter column "id" type text using ("id"::text);');
    this.addSql('alter table "communities" alter column "creator_id" type text using ("creator_id"::text);');

    this.addSql('alter table "posts" alter column "id" type text using ("id"::text);');
    this.addSql('alter table "posts" alter column "author_id" type text using ("author_id"::text);');
    this.addSql('alter table "posts" alter column "community_id" type text using ("community_id"::text);');

    this.addSql('alter table "posts_tags" alter column "post_entity_id" type text using ("post_entity_id"::text);');
    this.addSql('alter table "posts_tags" alter column "tag_entity_id" type text using ("tag_entity_id"::text);');

    this.addSql('alter table "comments" alter column "id" type text using ("id"::text);');
    this.addSql('alter table "comments" alter column "author_id" type text using ("author_id"::text);');
    this.addSql('alter table "comments" alter column "post_id" type text using ("post_id"::text);');

    this.addSql('alter table "bans" alter column "id" type text using ("id"::text);');
    this.addSql('alter table "bans" alter column "banned_by_id" type text using ("banned_by_id"::text);');

    this.addSql(
      'alter table "users_moderated_communities" alter column "user_entity_id" type text using ("user_entity_id"::text);'
    );
    this.addSql(
      'alter table "users_moderated_communities" alter column "community_entity_id" type text using ("community_entity_id"::text);'
    );

    this.addSql('alter table "tags" alter column "id" type int using ("id"::int);');
    this.addSql('create sequence if not exists "tags_id_seq";');
    this.addSql('select setval(\'tags_id_seq\', (select max("id") from "tags"));');
    this.addSql('alter table "tags" alter column "id" set default nextval(\'tags_id_seq\');');

    this.addSql('alter table "users" alter column "id" type int using ("id"::int);');
    this.addSql('create sequence if not exists "users_id_seq";');
    this.addSql('select setval(\'users_id_seq\', (select max("id") from "users"));');
    this.addSql('alter table "users" alter column "id" set default nextval(\'users_id_seq\');');

    this.addSql('alter table "reports" alter column "id" type int using ("id"::int);');
    this.addSql('alter table "reports" alter column "reporter_id" type int using ("reporter_id"::int);');
    this.addSql('create sequence if not exists "reports_id_seq";');
    this.addSql('select setval(\'reports_id_seq\', (select max("id") from "reports"));');
    this.addSql('alter table "reports" alter column "id" set default nextval(\'reports_id_seq\');');
    this.addSql(
      'alter table "reports" add constraint "reports_reporter_id_foreign" foreign key ("reporter_id") references "users" ("id") on update cascade;'
    );

    this.addSql('alter table "ratings" alter column "id" type int using ("id"::int);');
    this.addSql('alter table "ratings" alter column "rater_id" type int using ("rater_id"::int);');
    this.addSql('create sequence if not exists "ratings_id_seq";');
    this.addSql('select setval(\'ratings_id_seq\', (select max("id") from "ratings"));');
    this.addSql('alter table "ratings" alter column "id" set default nextval(\'ratings_id_seq\');');
    this.addSql(
      'alter table "ratings" add constraint "ratings_rater_id_foreign" foreign key ("rater_id") references "users" ("id") on update cascade;'
    );

    this.addSql('alter table "followers" alter column "id" type int using ("id"::int);');
    this.addSql('alter table "followers" alter column "user_id" type int using ("user_id"::int);');
    this.addSql('alter table "followers" alter column "lead_id" type int using ("lead_id"::int);');
    this.addSql('create sequence if not exists "followers_id_seq";');
    this.addSql('select setval(\'followers_id_seq\', (select max("id") from "followers"));');
    this.addSql('alter table "followers" alter column "id" set default nextval(\'followers_id_seq\');');
    this.addSql(
      'alter table "followers" add constraint "followers_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;'
    );
    this.addSql(
      'alter table "followers" add constraint "followers_lead_id_foreign" foreign key ("lead_id") references "users" ("id") on update cascade;'
    );

    this.addSql('alter table "communities" alter column "id" type int using ("id"::int);');
    this.addSql('alter table "communities" alter column "creator_id" type int using ("creator_id"::int);');
    this.addSql('create sequence if not exists "communities_id_seq";');
    this.addSql('select setval(\'communities_id_seq\', (select max("id") from "communities"));');
    this.addSql('alter table "communities" alter column "id" set default nextval(\'communities_id_seq\');');
    this.addSql(
      'alter table "communities" add constraint "communities_creator_id_foreign" foreign key ("creator_id") references "users" ("id") on update cascade;'
    );

    this.addSql('alter table "posts" alter column "id" type int using ("id"::int);');
    this.addSql('alter table "posts" alter column "author_id" type int using ("author_id"::int);');
    this.addSql('alter table "posts" alter column "community_id" type int using ("community_id"::int);');
    this.addSql('create sequence if not exists "posts_id_seq";');
    this.addSql('select setval(\'posts_id_seq\', (select max("id") from "posts"));');
    this.addSql('alter table "posts" alter column "id" set default nextval(\'posts_id_seq\');');
    this.addSql(
      'alter table "posts" add constraint "posts_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;'
    );
    this.addSql(
      'alter table "posts" add constraint "posts_community_id_foreign" foreign key ("community_id") references "communities" ("id") on update cascade on delete set null;'
    );

    this.addSql('alter table "posts_tags" alter column "post_entity_id" type int using ("post_entity_id"::int);');
    this.addSql('alter table "posts_tags" alter column "tag_entity_id" type int using ("tag_entity_id"::int);');
    this.addSql(
      'alter table "posts_tags" add constraint "posts_tags_post_entity_id_foreign" foreign key ("post_entity_id") references "posts" ("id") on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table "posts_tags" add constraint "posts_tags_tag_entity_id_foreign" foreign key ("tag_entity_id") references "tags" ("id") on update cascade on delete cascade;'
    );

    this.addSql('alter table "comments" alter column "id" type int using ("id"::int);');
    this.addSql('alter table "comments" alter column "author_id" type int using ("author_id"::int);');
    this.addSql('alter table "comments" alter column "post_id" type int using ("post_id"::int);');
    this.addSql('create sequence if not exists "comments_id_seq";');
    this.addSql('select setval(\'comments_id_seq\', (select max("id") from "comments"));');
    this.addSql('alter table "comments" alter column "id" set default nextval(\'comments_id_seq\');');
    this.addSql(
      'alter table "comments" add constraint "comments_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade on delete set null;'
    );
    this.addSql(
      'alter table "comments" add constraint "comments_post_id_foreign" foreign key ("post_id") references "posts" ("id") on update cascade on delete cascade;'
    );

    this.addSql('alter table "bans" alter column "id" type int using ("id"::int);');
    this.addSql('alter table "bans" alter column "banned_by_id" type int using ("banned_by_id"::int);');
    this.addSql('create sequence if not exists "bans_id_seq";');
    this.addSql('select setval(\'bans_id_seq\', (select max("id") from "bans"));');
    this.addSql('alter table "bans" alter column "id" set default nextval(\'bans_id_seq\');');
    this.addSql(
      'alter table "bans" add constraint "bans_banned_by_id_foreign" foreign key ("banned_by_id") references "users" ("id") on update cascade;'
    );

    this.addSql(
      'alter table "users_moderated_communities" alter column "user_entity_id" type int using ("user_entity_id"::int);'
    );
    this.addSql(
      'alter table "users_moderated_communities" alter column "community_entity_id" type int using ("community_entity_id"::int);'
    );
    this.addSql(
      'alter table "users_moderated_communities" add constraint "users_moderated_communities_user_entity_id_foreign" foreign key ("user_entity_id") references "users" ("id") on update cascade on delete cascade;'
    );
    this.addSql(
      'alter table "users_moderated_communities" add constraint "users_moderated_communities_community_entity_id_foreign" foreign key ("community_entity_id") references "communities" ("id") on update cascade on delete cascade;'
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "bans" drop constraint "bans_banned_by_id_foreign";');

    this.addSql('alter table "comments" drop constraint "comments_author_id_foreign";');
    this.addSql('alter table "comments" drop constraint "comments_post_id_foreign";');

    this.addSql('alter table "communities" drop constraint "communities_creator_id_foreign";');

    this.addSql('alter table "followers" drop constraint "followers_user_id_foreign";');
    this.addSql('alter table "followers" drop constraint "followers_lead_id_foreign";');

    this.addSql('alter table "posts" drop constraint "posts_author_id_foreign";');
    this.addSql('alter table "posts" drop constraint "posts_community_id_foreign";');

    this.addSql('alter table "posts_tags" drop constraint "posts_tags_post_entity_id_foreign";');
    this.addSql('alter table "posts_tags" drop constraint "posts_tags_tag_entity_id_foreign";');

    this.addSql('alter table "ratings" drop constraint "ratings_rater_id_foreign";');

    this.addSql('alter table "reports" drop constraint "reports_reporter_id_foreign";');

    this.addSql(
      'alter table "users_moderated_communities" drop constraint "users_moderated_communities_user_entity_id_foreign";'
    );
    this.addSql(
      'alter table "users_moderated_communities" drop constraint "users_moderated_communities_community_entity_id_foreign";'
    );

    this.addSql('alter table "bans" alter column "id" drop default;');
    this.addSql('alter table "bans" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "bans" alter column "banned_by_id" drop default;');
    this.addSql('alter table "bans" alter column "banned_by_id" type uuid using ("banned_by_id"::text::uuid);');
    this.addSql('alter table "bans" alter column "id" drop default;');

    this.addSql('alter table "comments" alter column "id" drop default;');
    this.addSql('alter table "comments" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "comments" alter column "author_id" drop default;');
    this.addSql('alter table "comments" alter column "author_id" type uuid using ("author_id"::text::uuid);');
    this.addSql('alter table "comments" alter column "post_id" drop default;');
    this.addSql('alter table "comments" alter column "post_id" type uuid using ("post_id"::text::uuid);');
    this.addSql('alter table "comments" alter column "id" drop default;');

    this.addSql('alter table "communities" alter column "id" drop default;');
    this.addSql('alter table "communities" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "communities" alter column "creator_id" drop default;');
    this.addSql('alter table "communities" alter column "creator_id" type uuid using ("creator_id"::text::uuid);');
    this.addSql('alter table "communities" alter column "id" drop default;');

    this.addSql('alter table "followers" alter column "id" drop default;');
    this.addSql('alter table "followers" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "followers" alter column "user_id" drop default;');
    this.addSql('alter table "followers" alter column "user_id" type uuid using ("user_id"::text::uuid);');
    this.addSql('alter table "followers" alter column "lead_id" drop default;');
    this.addSql('alter table "followers" alter column "lead_id" type uuid using ("lead_id"::text::uuid);');
    this.addSql('alter table "followers" alter column "id" drop default;');

    this.addSql('alter table "posts" alter column "id" drop default;');
    this.addSql('alter table "posts" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "posts" alter column "author_id" drop default;');
    this.addSql('alter table "posts" alter column "author_id" type uuid using ("author_id"::text::uuid);');
    this.addSql('alter table "posts" alter column "community_id" drop default;');
    this.addSql('alter table "posts" alter column "community_id" type uuid using ("community_id"::text::uuid);');
    this.addSql('alter table "posts" alter column "id" drop default;');

    this.addSql('alter table "posts_tags" alter column "post_entity_id" drop default;');
    this.addSql(
      'alter table "posts_tags" alter column "post_entity_id" type uuid using ("post_entity_id"::text::uuid);'
    );
    this.addSql('alter table "posts_tags" alter column "tag_entity_id" drop default;');
    this.addSql('alter table "posts_tags" alter column "tag_entity_id" type uuid using ("tag_entity_id"::text::uuid);');

    this.addSql('alter table "ratings" alter column "id" drop default;');
    this.addSql('alter table "ratings" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "ratings" alter column "rater_id" drop default;');
    this.addSql('alter table "ratings" alter column "rater_id" type uuid using ("rater_id"::text::uuid);');
    this.addSql('alter table "ratings" alter column "id" drop default;');

    this.addSql('alter table "reports" alter column "id" drop default;');
    this.addSql('alter table "reports" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "reports" alter column "reporter_id" drop default;');
    this.addSql('alter table "reports" alter column "reporter_id" type uuid using ("reporter_id"::text::uuid);');
    this.addSql('alter table "reports" alter column "id" drop default;');

    this.addSql('alter table "tags" alter column "id" drop default;');
    this.addSql('alter table "tags" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "tags" alter column "id" drop default;');

    this.addSql('alter table "users" alter column "id" drop default;');
    this.addSql('alter table "users" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "users" alter column "id" drop default;');

    this.addSql('alter table "users_moderated_communities" alter column "user_entity_id" drop default;');
    this.addSql(
      'alter table "users_moderated_communities" alter column "user_entity_id" type uuid using ("user_entity_id"::text::uuid);'
    );
    this.addSql('alter table "users_moderated_communities" alter column "community_entity_id" drop default;');
    this.addSql(
      'alter table "users_moderated_communities" alter column "community_entity_id" type uuid using ("community_entity_id"::text::uuid);'
    );
  }
}
