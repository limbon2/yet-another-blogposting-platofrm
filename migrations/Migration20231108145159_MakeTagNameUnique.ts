import { Migration } from '@mikro-orm/migrations';

export class Migration20231108145159_MakeTagNameUnique extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "tags" add constraint "tags_name_unique" unique ("name");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "tags" drop constraint "tags_name_unique";');
  }

}
