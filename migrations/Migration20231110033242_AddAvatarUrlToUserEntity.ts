import { Migration } from '@mikro-orm/migrations';

export class Migration20231110033242_AddAvatarUrlToUserEntity extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add column "avatar_url" text null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop column "avatar_url";');
  }

}
