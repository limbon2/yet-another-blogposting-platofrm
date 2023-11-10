import { Migration } from '@mikro-orm/migrations';

export class Migration20231110124807_AddReportEntity extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "reports" ("id" uuid not null, "category" text check ("category" in (\'misleading-content\', \'hate-speech\', \'harassment\', \'spam\', \'plagiarism\', \'threats\', \'adult-content\', \'privacy-violation\', \'copyright-infringement\', \'fake-news\')) not null, "text" text null, "target_id" uuid not null, "reporter_id" uuid not null, "created_at" timestamptz(0) not null, constraint "reports_pkey" primary key ("id"));');

    this.addSql('alter table "reports" add constraint "reports_reporter_id_foreign" foreign key ("reporter_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "reports" cascade;');
  }

}
