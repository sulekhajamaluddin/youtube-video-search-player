import { Knex } from 'knex';

export async function up(knex: Knex): Promise<boolean> {
  await knex.schema.createTable(
    'favoritevideos',
    (table: Knex.TableBuilder) => {
      table.increments('id');
      table.integer('video_id').references('id').inTable('videos');
    }
  );
  return true;
}

export async function down(knex: Knex): Promise<boolean> {
  await knex.schema.dropTableIfExists('favoritevideos');
  return true;
}
