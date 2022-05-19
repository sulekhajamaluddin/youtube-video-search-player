import { Model } from 'objection';

class FavoriteVideo extends Model {
  id: number;
  video_id: number;
  user_id: number;

  static get tableName() {
    return 'favoritevideos';
  }
}

export { FavoriteVideo };
