import { Migration } from '@mikro-orm/migrations';

export class Migration20231109173256_AddRatingToUser extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add column "rating" bigint not null default 0;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop column "rating";');
  }

}
