import { Migration } from '@mikro-orm/migrations';

export class Migration20231108094800_AddFollowerEntity extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "followers" ("id" uuid not null, "user_id" uuid not null, "lead_id" uuid not null, "created_at" timestamptz(0) not null, constraint "followers_pkey" primary key ("id"));');

    this.addSql('alter table "followers" add constraint "followers_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "followers" add constraint "followers_lead_id_foreign" foreign key ("lead_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "followers" cascade;');
  }

}
