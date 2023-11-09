import { Migration } from '@mikro-orm/migrations';

export class Migration20231109163634_AddRatingToCommentEntity extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "comments" add column "rating" bigint not null default 0;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "comments" drop column "rating";');
  }

}
