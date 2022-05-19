import { Model } from 'objection';

class Video extends Model {
  id:number;
  name: string;
  etag: string;
  kind: string;
  videoId: string;
  idkind: string;

  static get tableName() {
    return 'videos';
  }
}

export { Video };
