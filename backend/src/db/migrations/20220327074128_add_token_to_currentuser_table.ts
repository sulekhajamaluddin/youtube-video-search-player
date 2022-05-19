import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('currentuser', (table: Knex.TableBuilder) => {
    table.string('token');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('currentuser', (table: Knex.TableBuilder) => {
    table.dropColumn('token');
  });
}
