import { Migration } from '@mikro-orm/migrations';

export class Migration20231109122745_AddConfirmedFieldTouser extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add column "is_confirmed" boolean not null default false;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop column "is_confirmed";');
  }

}
