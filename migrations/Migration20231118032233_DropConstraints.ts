import { Migration } from '@mikro-orm/migrations';
import schemaInspector from 'knex-schema-inspector';

export class Migration20231118032233_DropConstraints extends Migration {
  async up(): Promise<void> {
    const knex = this.getKnex();
    const inspector = schemaInspector(knex);

    const tables = await inspector.tables();

    for (const table of tables) {
      const constraints = await inspector.foreignKeys(table);

      const sqls = knex.schema
        .alterTable(table, (t) => {
          for (const constraint of constraints) {
            t.dropForeign(constraint.column);
          }
        })
        .toSQL();

      for (const { sql } of sqls) {
        this.addSql(sql);
      }
    }
  }
}
