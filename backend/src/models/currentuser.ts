import { Model } from 'objection';

class CurrentUser extends Model {
  id: number;
  user_id: number;
  token: string;
  created_at: any;

  static get tableName() {
    return 'currentuser';
  }
}

export { CurrentUser };
