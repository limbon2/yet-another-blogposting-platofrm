import { Migration } from '@mikro-orm/migrations';

export class Migration20231108145352_AddIndexToTags extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "tags" add column "name_lower_case" varchar(255) not null;');
    this.addSql('create index "tags_name_lower_case_index" on "tags" ("name_lower_case");');
  }

  async down(): Promise<void> {
    this.addSql('drop index "tags_name_lower_case_index";');
    this.addSql('alter table "tags" drop column "name_lower_case";');
  }

}
