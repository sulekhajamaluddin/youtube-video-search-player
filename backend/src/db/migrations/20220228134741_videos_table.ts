import { Knex } from 'knex';

export async function up(knex: Knex): Promise<boolean> {
  await knex.schema.createTable('videos', (table: Knex.TableBuilder) => {
    table.increments('id');
    table.string('etag');
    table.string('name');
    table.string('videoId');
    table.string('idkind');
    table.string('kind');
  });
  return true;
}

export async function down(knex: Knex): Promise<boolean> {
  await knex.schema.dropTableIfExists('videos');
  return true;
}
