import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('currentuser', (table: Knex.TableBuilder) => {
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('currentuser', (table: Knex.TableBuilder) => {
    table.timestamps();
  });
}
