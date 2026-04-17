import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Character (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/api/v1/character (GET)', () => {
    it('should return 401 without auth token', () => {
      return request(app.getHttpServer())
        .get('/api/v1/character')
        .expect(200)
        .expect((res) => {
          expect(res.body.code).toBe(0);
        });
    });
  });

  describe('/api/v1/character/ranking (GET)', () => {
    it('should return error without zone_id', () => {
      return request(app.getHttpServer())
        .get('/api/v1/character/ranking')
        .expect(200)
        .expect((res) => {
          expect(res.body.code).toBe(0);
        });
    });

    it('should return error without auth token', () => {
      return request(app.getHttpServer())
        .get('/api/v1/character/ranking?zone_id=1')
        .expect(200)
        .expect((res) => {
          expect(res.body.code).toBe(0);
        });
    });
  });

  describe('/api/v1/character (POST)', () => {
    it('should return error without auth token', () => {
      return request(app.getHttpServer())
        .post('/api/v1/character')
        .send({
          name: 'TestCharacter',
          zone_id: 1,
          country: 1,
          job: 1,
          gender: 1,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.code).toBe(0);
        });
    });

    it('should return error for missing fields', () => {
      return request(app.getHttpServer())
        .post('/api/v1/character')
        .send({ name: 'TestCharacter' })
        .expect(200)
        .expect((res) => {
          expect(res.body.code).toBe(0);
        });
    });
  });
});
