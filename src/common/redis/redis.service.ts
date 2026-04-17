import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;
  private connected = false;
  private readonly logger = new Logger(RedisService.name);

  onModuleInit() {
    try {
      this.client = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        retryStrategy: (times) => {
          if (times > 3) {
            this.logger.warn('Redis 连接失败，禁用缓存功能');
            return null;
          }
          return Math.min(times * 100, 3000);
        },
      });

      this.client.on('connect', () => {
        this.connected = true;
        this.logger.log('Redis 连接成功');
      });

      this.client.on('error', (err) => {
        this.connected = false;
        this.logger.warn(`Redis 连接错误: ${err.message}`);
      });
    } catch (error) {
      this.logger.warn('Redis 初始化失败，禁用缓存功能');
    }
  }

  onModuleDestroy() {
    if (this.client) {
      this.client.quit();
    }
  }

  getClient(): Redis {
    return this.client;
  }

  isConnected(): boolean {
    return this.connected;
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (!this.connected) return;
    try {
      if (ttl) {
        await this.client.setex(key, ttl, value);
      } else {
        await this.client.set(key, value);
      }
    } catch (error) {
      this.logger.warn(`Redis set 失败: ${(error as Error).message}`);
    }
  }

  async get(key: string): Promise<string | null> {
    if (!this.connected) return null;
    try {
      return await this.client.get(key);
    } catch (error) {
      this.logger.warn(`Redis get 失败: ${(error as Error).message}`);
      return null;
    }
  }

  async del(key: string): Promise<void> {
    if (!this.connected) return;
    try {
      await this.client.del(key);
    } catch (error) {
      this.logger.warn(`Redis del 失败: ${(error as Error).message}`);
    }
  }

  async exists(key: string): Promise<boolean> {
    if (!this.connected) return false;
    try {
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      this.logger.warn(`Redis exists 失败: ${(error as Error).message}`);
      return false;
    }
  }
}
