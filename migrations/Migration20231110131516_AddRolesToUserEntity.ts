import { Migration } from '@mikro-orm/migrations';

export class Migration20231110131516_AddRolesToUserEntity extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add column "role" text check ("role" in (\'admin\', \'moderator\', \'user\')) not null default \'user\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop column "role";');
  }

}
