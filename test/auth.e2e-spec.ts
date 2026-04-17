import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth (e2e)', () => {
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

  describe('/api/login (POST)', () => {
    it('should return error for invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/api/login')
        .send({ username: 'invalid', password: 'invalid' })
        .expect(200)
        .expect((res) => {
          expect(res.body.code).toBe(0);
          expect(res.body.msg).toContain('用户名或密码错误');
        });
    });

    it('should return error for missing fields', () => {
      return request(app.getHttpServer())
        .post('/api/login')
        .send({ username: 'test' })
        .expect(200)
        .expect((res) => {
          expect(res.body.code).toBe(0);
        });
    });
  });

  describe('/api/reg (POST)', () => {
    it('should return error for invalid invite code', () => {
      return request(app.getHttpServer())
        .post('/api/reg')
        .send({
          username: 'testuser',
          password: 'testpass',
          invitecode: 'invalid',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.code).toBe(0);
          expect(res.body.msg).toContain('邀请码无效');
        });
    });

    it('should return error for missing fields', () => {
      return request(app.getHttpServer())
        .post('/api/reg')
        .send({ username: 'testuser' })
        .expect(200)
        .expect((res) => {
          expect(res.body.code).toBe(0);
        });
    });
  });
});
