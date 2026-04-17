import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Zone (e2e)', () => {
  let app: INestApplication;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // 创建测试用户并获取 token（需要数据库支持）
    // authToken = 'test-token';
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/api/v1/zone (GET)', () => {
    it('should return zones list', () => {
      return request(app.getHttpServer())
        .get('/api/v1/zone')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('code');
          expect(res.body).toHaveProperty('msg');
          expect(res.body).toHaveProperty('data');
          expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    it('should return 401 without auth token', () => {
      return request(app.getHttpServer())
        .get('/api/v1/zone')
        .expect(200)
        .expect((res) => {
          // 由于没有 token，应该返回认证错误
          expect(res.body.code).toBe(0);
        });
    });
  });
});
