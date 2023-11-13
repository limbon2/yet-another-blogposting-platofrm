import { Migration } from '@mikro-orm/migrations';

export class Migration20231113141020_AddSlugFieldToPostEntity extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "posts" add column "slug" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "posts" drop column "slug";');
  }

}
