import { Migration } from '@mikro-orm/migrations';

export class Migration20231117183608_MakePostContentTextField extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "posts" alter column "content" type text using ("content"::text);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "posts" alter column "content" type varchar(255) using ("content"::varchar(255));');
  }

}
