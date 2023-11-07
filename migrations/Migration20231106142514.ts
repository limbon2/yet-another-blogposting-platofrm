import { Migration } from '@mikro-orm/migrations';

export class Migration20231106142514 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" uuid not null, "username" varchar(96) not null, "email" varchar(255) not null, "password" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "users_pkey" primary key ("id"));');
    this.addSql('create index "users_email_index" on "users" ("email");');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
  }

}
