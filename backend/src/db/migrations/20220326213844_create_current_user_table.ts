import { Knex } from 'knex';

export async function up(knex: Knex): Promise<boolean> {
  await knex.schema.createTable(
    'currentuser',
    (table: Knex.TableBuilder) => {
      table.increments('id');
      table.integer('user_id').references('id').inTable('users');
    }
  );
  return true;
}

export async function down(knex: Knex): Promise<boolean> {
  await knex.schema.dropTableIfExists('currentuser');
  return true;
}
