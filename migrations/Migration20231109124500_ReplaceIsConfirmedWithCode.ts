import { Migration } from '@mikro-orm/migrations';

export class Migration20231109124500_ReplaceIsConfirmedWithCode extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "users" add column "code" varchar(6) null;');
    this.addSql('alter table "users" drop column "is_confirmed";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" add column "is_confirmed" boolean not null default false;');
    this.addSql('alter table "users" drop column "code";');
  }
}
