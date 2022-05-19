import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('favoritevideos', (table: Knex.TableBuilder) => {
    table.integer('user_id').references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('favoritevideos', (table: Knex.TableBuilder) => {
    table.dropColumn('user_id');
  });
}
