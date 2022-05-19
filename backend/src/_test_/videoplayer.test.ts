import supertest from 'supertest';
import setUpServer from '../app';

const app = setUpServer();

describe('videoplayer', () => {
  describe('getallvideos route', () => {
    describe('given the route exists', () => {
      it('should return a 200 and all the videos', async () => {
        await supertest(app).get('/api/v1/videoplayer').expect(200);
      });
    });
  });
});

describe('videoplayer', () => {
  describe('getallvideos route', () => {
    describe('given the route does not exist', () => {
      it('should return a 404', async () => {
        const resource = 'video';
        await supertest(app).get(`/api/v1/${resource}`).expect(404);
      });
    });
  });
  afterAll((done) => {
    done();
  });
});
