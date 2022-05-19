import { Model } from 'objection';
import bcrypt from 'bcrypt';

class User extends Model {
  id: number;

  email!: string;

  password!: string;

  static get tableName() {
    return 'users';
  }
  $beforeInsert(): void | Promise<string> {
    this.password = bcrypt.hashSync(this.password, 14);
  }
}

export { User };
