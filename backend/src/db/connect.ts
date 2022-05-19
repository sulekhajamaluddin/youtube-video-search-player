import knex from 'knex';
import config from './knexfile';
import { Model } from 'objection';

function setUpDB() {
  const db = knex(config.development);
  Model.knex(db);
}

export default setUpDB;
