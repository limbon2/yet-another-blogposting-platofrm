import { Migration } from '@mikro-orm/migrations';

export class Migration20231113133849_ReplaceLowercaseNameWithSlugOnCommunityEntity extends Migration {

  async up(): Promise<void> {
    this.addSql('drop index "communities_name_lower_case_index";');
    this.addSql('alter table "communities" rename column "name_lower_case" to "slug";');
    this.addSql('create index "communities_slug_index" on "communities" ("slug");');
  }

  async down(): Promise<void> {
    this.addSql('drop index "communities_slug_index";');
    this.addSql('alter table "communities" rename column "slug" to "name_lower_case";');
    this.addSql('create index "communities_name_lower_case_index" on "communities" ("name_lower_case");');
  }

}
