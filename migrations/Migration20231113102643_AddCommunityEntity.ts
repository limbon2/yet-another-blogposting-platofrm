import { Migration } from '@mikro-orm/migrations';

export class Migration20231113102643_AddCommunityEntity extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "communities" ("id" uuid not null, "name" varchar(255) not null, "name_lower_case" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "creator_id" uuid not null, constraint "communities_pkey" primary key ("id"));');
    this.addSql('alter table "communities" add constraint "communities_name_unique" unique ("name");');
    this.addSql('create index "communities_name_lower_case_index" on "communities" ("name_lower_case");');

    this.addSql('create table "users_moderated_communities" ("user_entity_id" uuid not null, "community_entity_id" uuid not null, constraint "users_moderated_communities_pkey" primary key ("user_entity_id", "community_entity_id"));');

    this.addSql('alter table "communities" add constraint "communities_creator_id_foreign" foreign key ("creator_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "users_moderated_communities" add constraint "users_moderated_communities_user_entity_id_foreign" foreign key ("user_entity_id") references "users" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "users_moderated_communities" add constraint "users_moderated_communities_community_entity_id_foreign" foreign key ("community_entity_id") references "communities" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "posts" add column "community_id" uuid null;');
    this.addSql('alter table "posts" add constraint "posts_community_id_foreign" foreign key ("community_id") references "communities" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "posts" drop constraint "posts_community_id_foreign";');

    this.addSql('alter table "users_moderated_communities" drop constraint "users_moderated_communities_community_entity_id_foreign";');

    this.addSql('drop table if exists "communities" cascade;');

    this.addSql('drop table if exists "users_moderated_communities" cascade;');

    this.addSql('alter table "posts" drop column "community_id";');
  }

}
